
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

export const searchDatesPoliline = (inicial,final) => {

    return async(dispatch) => {
        await fetch(`${env.FETCHURL}/consultas?inicial=${inicial}&final=${final}`)
        .then(response => response.json())
        .then(data => {
            dispatch(polilineDates(data.data));
        })
    }

}
