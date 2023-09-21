import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/react-leaflet.css';
import {CircleIcon, FlagIcon, MarkerIcon, TaxiIcon} from './react-leaflet-icon.js';
import { useSelector } from 'react-redux';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { IconButton } from '@mui/material';

export const ReactMapConsulta = ({lat,long,polyline=[]}) => {

    const {datosconsulta} = useSelector(state => state.dates)
    if(polyline.length != 0) {

        var latlon=polyline[0]
        lat=latlon[0].toString();
        long=latlon[1].toString();

        var condf=polyline.length-1;
        var latlon2=polyline[condf]
        var latf=latlon2[0].toString();
        var longf=latlon2[1].toString();
    } else {
        lat=lat.toString();
        long=long.toString();
        var latf=0;
        var longf=0;
    }
    var [center, setcenter] = useState([lat,long]);
    var [mfinal, setmfinal] = useState([0,0])

    useEffect(() => { 
        setcenter([lat,long])
        setmfinal([latf,longf])
    }, [polyline.length])
    
    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    const mapRef = useRef(null);
    const centerMap = () => { 
        if (mapRef.current) {
            mapRef.current.setView(center); 
        }
    };

    const limeOptions = { color: 'lime' }
    

    return (
        <div>
            <MapContainer center={center} zoom={4} ref={mapRef}>
                <ChangeView center={center} zoom={16} />
                <Polyline pathOptions={limeOptions} positions={polyline} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={center} icon={TaxiIcon} >
                    <Popup><pre>inicio</pre></Popup>
                </Marker>
                {
                    datosconsulta.map(punto =>(
                        <Marker key={punto.IdEnvio} position={[punto.Latitud.toString(),punto.Longitud.toString()]} icon={CircleIcon}>
                            <Popup><pre>{"Fecha: "+punto.Fecha.split('T')[0]+" Hora: " + punto.Hora}</pre></Popup>
                        </Marker>
                    ))
                }
                <Marker position={mfinal} icon={FlagIcon} >
                    <Popup><pre>final <a href="https://www.freepik.es/icono/bandera_559219#fromView=search&term=flag&page=1&position=34">Icon by Prosymbols</a></pre></Popup>
                </Marker>
            </MapContainer>
            <IconButton
                onClick={centerMap}
                size="small"
                sx={{
                    border:'solid',
                    color:"gray",
                    zIndex:100,
                    backgroundColor:'whithe',
                    ':hover': {backgroundColor:'green',opacity:0.7},
                    position:'absolute',
                    right:'10vw',
                    bottom:'-15vh'
                }}
                >
                <MyLocationIcon sx={{fontSize:20}}/>
            </IconButton>
        </div>
    )
}