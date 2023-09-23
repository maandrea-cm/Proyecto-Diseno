import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../css/react-leaflet.css';
import {CircleIcon, FlagIcon, MarkerIcon, StartIcon, TaxiIcon} from './react-leaflet-icon.js';
import { useSelector } from 'react-redux';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { IconButton } from '@mui/material';

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

export const ReactMapConsulta = ({lat,long,polyline=[],sliderValue=0}) => {

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
                <ChangeView center={center}/>
                <Polyline pathOptions={limeOptions} positions={polyline} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={center} icon={StartIcon} >
                    <Popup><pre>inicio</pre></Popup>
                </Marker>
                {
                    datosconsulta.map(punto =>(
                        <Marker key={punto.IdEnvio} position={[punto.Latitud.toString(),punto.Longitud.toString()]} icon={CircleIcon}>
                            <Popup><pre>{"Fecha: "+punto.Fecha.split('T')[0]+" Hora: " + punto.Hora}</pre></Popup>
                        </Marker>
                    ))
                }
                <FinalMarker pos={mfinal}/>
                {
                    datosconsulta.length
                    ? <div>
                        <Popup position={[datosconsulta[sliderValue].Latitud.toString(),datosconsulta[sliderValue].Longitud.toString()]} onClose={true}>
                            <pre>
                                {"Fecha: "+ datosconsulta[sliderValue].Fecha.split('T')[0] +" Hora: " + datosconsulta[sliderValue].Hora+" id: "+datosconsulta[sliderValue].IdEnvio}
                            </pre>
                        </Popup>
                        <ChangeView center={[datosconsulta[sliderValue].Latitud.toString(),datosconsulta[sliderValue].Longitud.toString()]} />
                    </div>
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
                    right:'10vw',
                    bottom:'-15vh'
                }}
                >
                <MyLocationIcon sx={{fontSize:20}}/>
            </IconButton>
        </div>
    )
}