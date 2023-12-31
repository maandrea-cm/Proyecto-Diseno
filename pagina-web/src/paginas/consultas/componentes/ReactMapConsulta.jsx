import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, useMapEvents, Circle} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../../utilidades/react-leaflet.css';
import {CircleIcon, FlagIcon, MarkerIcon, StartIcon2, TaxiIcon} from '../../../utilidades/react-leaflet-icon.js';
import { useSelector } from 'react-redux';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { IconButton } from '@mui/material';
import { fillBlueOptions, isInCircle, verificarcontinuidad } from '../../tiemporeal/logica/consultas';

const FinalMarker = ({pos}) =>{
    if(pos[0]!=0){
        return(
            <Marker position={pos} icon={FlagIcon} >
                <Popup><pre>final</pre></Popup>
            </Marker>
        )
    }
    return(null)
}
const ClickHandler = ({ handleMapClick }) => {
    const map = useMapEvents({
    click: (e) => {
        handleMapClick(e);
    },
    });
    return null;
};

export const ReactMapConsulta = ({lat,long,polyline}) => {

    const [polyCircle,setPolyCirlce] = useState([])
    const [circleOpen, setCircleOpen] = useState(false);
    const [clickedPosition, setClickedPosition] = useState(null);
    const [multiPoly, setMultiPoly] = useState([])
    const [datesToCircle, setDatesToCircle] = useState([])

    const {datosconsulta} = useSelector(state => state.dates)
    var latlon,condf,latlon2,latf,longf;

    if(polyline.length != 0) {

        latlon=polyline[0]
        lat=latlon[0].toString();
        long=latlon[1].toString();

        condf=polyline.length-1;
        latlon2=polyline[condf]
        latf=latlon2[0].toString();
        longf=latlon2[1].toString();
    } else {
        lat=lat.toString();
        long=long.toString();
        latf=0;
        longf=0;
    }
    const [center, setcenter] = useState([lat,long]);
    const [mfinal, setmfinal] = useState([0,0])

    useEffect(() => { 
        setcenter([lat,long])
        setmfinal([latf,longf])
        const {polylines,newVectorCircle} = verificarcontinuidad(datosconsulta)
        setMultiPoly(polylines)
        setDatesToCircle(newVectorCircle)
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
    
    const handleMapClick = (e) => {
        const clickedCoordinates = e.latlng;
        setClickedPosition(clickedCoordinates);
        const newPolip = isInCircle(datosconsulta,clickedCoordinates)
        if(newPolip){
            setPolyCirlce(newPolip)
            setCircleOpen(true);
        }
        
    };
    return (
        <div>
            <MapContainer center={center} zoom={15} ref={mapRef}>
                <ChangeView center={center}/>
                <Polyline pathOptions={limeOptions} positions={multiPoly} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Eventos de click */}
                <ClickHandler handleMapClick={handleMapClick} />
                {
                    circleOpen
                    ?<>
                        <Circle center={clickedPosition} pathOptions={fillBlueOptions} radius={200} />
                        <ChangeView center={clickedPosition}/>
                    </>
                    :null
                }
                {
                    polyCircle.length>0
                    ?<Popup id='PopupLupa' position={[polyCircle[0].Latitud.toString(),polyCircle[0].Longitud.toString()]} onClose={true}>
                        
                            {
                                polyCircle.map(punto =>{
                                    return(
                                        <pre key={punto.idEnvio}>
                                            {`Fecha: ${punto.Fecha.split('T')[0]} Hora: ${punto.Hora}`}
                                        </pre> 
                                    )})
                            }
                        
                    </Popup>
                    :null
                }
                {/* <Marker position={center} icon={StartIcon} >
                    <Popup><pre>inicio</pre></Popup>
                </Marker>
                <FinalMarker pos={mfinal}/> */}
                {
                    multiPoly.length>0
                    ?<>
                        {
                            multiPoly.map((poly)=>{
                                console.log(poly.length)
                                return<>{

                                poly.length>=4
                                ?<>
                                    <Marker position={[poly[0][0].toString(),poly[0][1].toString()]} icon={StartIcon2} >
                                        <Popup><pre>inicio</pre></Popup>
                                    </Marker>
                                    <Marker position={[poly[poly.length-1][0].toString(),poly[poly.length-1][1].toString()]} icon={CircleIcon} >
                                        <Popup><pre>Fin</pre></Popup>
                                    </Marker>
                                </>
                                :null
                                }
                                
                                </>
                            })
                        }
                    </>
                    :null
                }
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
                    right:'8vw',
                    bottom:'5vh'
                }}
                >
                <MyLocationIcon sx={{fontSize:20}}/>
            </IconButton>
        </div>
    )
}