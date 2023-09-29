import { Marker, Popup} from 'react-leaflet';
import { StartIcon } from "../../../utilidades/react-leaflet-icon"

export const StartMarker = ({pos,cond}) =>{
    if(cond[0]!=cond[1]){
        return(
            <Marker position={pos} icon={StartIcon} >
                <Popup>
                    <pre>{"Lat: "+ pos[0]}</pre>
                    <pre>{"Long: "+ pos[1]}</pre>
                </Popup>
            </Marker>
        )
    }
    return(null)
}