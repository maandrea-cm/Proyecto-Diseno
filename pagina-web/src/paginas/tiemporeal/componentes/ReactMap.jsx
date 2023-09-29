import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../../utilidades/react-leaflet.css';
import {CircleIcon, MarkerIcon, StartIcon, TaxiIcon} from '../../../utilidades/react-leaflet-icon.js';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { IconButton } from '@mui/material';
import { StartMarker } from '../logica/StartMarker';
import { vectorPoli } from '../logica/logica';

export const ReactMap = ({id,polireal}) => {
    const {polyline,idinit,idfin,centeri,centerf} = vectorPoli({polireal});
        
    const [center, setcenter] = useState(centeri);
    const [mfinal, setmfinal] = useState(centerf)
    const [condicion,setcondicion] = useState([idinit,idfin])
    var polyl=polyline;

    useEffect(() => {
        const {polyline,idinit,idfin,centeri,centerf} = vectorPoli({polireal});
        polyl=polyline;
        setcenter(centeri)
        setmfinal(centerf)
        setcondicion([idinit,idfin])
    }, [id])
    
    const mapRef = useRef(null);
    const centerMap = () => { 
        if (mapRef.current) {
            mapRef.current.setView(mfinal); 
        }
    };
    const limeOptions = { color: 'lime'}
    

    return (
        <div>
            <MapContainer center={mfinal} zoom={15} ref={mapRef}>
                <Polyline pathOptions={limeOptions} positions={polyl}/>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <StartMarker pos={center} cond={condicion}/>
                {
                    polireal.map(punto =>(
                        <Marker key={punto.IdEnvio} position={[punto.Latitud.toString(),punto.Longitud.toString()]} icon={CircleIcon}>
                            <Popup><pre>{"Hora: " + punto.Hora}</pre></Popup>
                        </Marker>
                    ))
                }
                <Marker position={mfinal} icon={TaxiIcon} >
                    <Popup>
                        <pre>{"Lat: "+ center[0] }</pre>
                        <pre>{"Long: "+ center[1]}</pre>
                    </Popup>
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

