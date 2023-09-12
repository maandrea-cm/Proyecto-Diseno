
import env from '../../../env';
import { searchingDates} from './datesSlice';


export const searchDates = () => {

    return async(dispatch) => {
        await fetch(env.FETCHURL)
        .then(response => response.json())
        .then(data => {
            dispatch(searchingDates(data.data[0]));
        })

    }

}
