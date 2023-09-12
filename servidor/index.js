import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import dgram from 'dgram'
import env from './env.js'

const socket = dgram.createSocket('udp4');
const app = express();
app.use(cors())

export const conexion = mysql.createConnection({
    host : env.HOST,
    database : env.DATABASE,
    user : env.USER,
    password : env.PASSWORD
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('BD Conectada exitosamente');
});

app.get('/',(req,res) =>{
    res.send('Bienvenido a mi servidor UDP')
})

app.get('/recibir',(req,res) => {
    let tabledb = env.TABLE;
    var sqlpetget = `SELECT * FROM ${tabledb} WHERE IdEnvio = (SELECT MAX(IdEnvio ) FROM ${tabledb});`;
    conexion.query(sqlpetget, (err, mess) => {
        res.status(200).json({
            data:mess,
        });
    });
})

socket.on('message', (msg, rinfo) => {

    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    msg=msg.toString()
    const datos = msg.split(' || ');
    console.log(datos)
    var fecha = datos[0]
    var time = datos[1]
    var lat = datos[2]
    var lon = datos[3]

    let tabledb = env.TABLE;
    
    var sqlpet=`INSERT INTO ${tabledb} (IdEnvio, Fecha, Longitud, Latitud, Hora) VALUES (NULL,STR_TO_DATE('${fecha}','%Y-%m-%d'),${lon},${lat},STR_TO_DATE('${time}','%H:%i:%s'));`;
    conexion.query(sqlpet, (err) => {
        if (!err) {
            console.log('Base de datos modificada exitosamente desde udp')
        } else {
            console.log(err);
        }
    })

});

socket.bind(env.PORT);

app.set('port',env.PORT)
app.use(express.json());
app.listen(app.get('port'), '0.0.0.0' ,()=>{
    console.log("Alojado en el puerto:",app.get('port'))
})

