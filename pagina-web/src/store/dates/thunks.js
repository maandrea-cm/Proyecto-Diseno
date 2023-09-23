
import Swal from 'sweetalert2';
import env from '../../../env';
import { polilineDates, searchingDates} from './datesSlice';


export const searchDates = () => {

    return async(dispatch) => {
        await fetch(`${env.FETCHURL}/recibir`)
        .then(response => response.json())
        .then(data => {
            dispatch(searchingDates(data.data[0]));
        })

    }

}

export const searchDatesPolilinewtime = (inicial,final) => {
    console.log('inicial: ',inicial,' final: ',final)
    return async(dispatch) => {
        await fetch(`${env.FETCHURL}/consultas?inicial=${inicial}&final=${final}`)
        .then(response => response.json())
        .then(data => {
            if (data.data.length==0){
                Swal.fire('No se encontraron datos');
            }
            dispatch(polilineDates(data.data));
        })
    }

}
