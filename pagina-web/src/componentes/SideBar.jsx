import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box,Button,Typography } from "@mui/material"
import { useDispatch } from 'react-redux';
import {searchDatesPolilinewtime } from '../store/dates/thunks';


export const SideBar = () => {
    const today = new Date;
    const newmin = new Date("2023-07-01")
    const [hinicial, sethinicial] = useState('00:00:00')
    const [hfinal, sethfinal] = useState('23:59:59')
    
    const dispatch = useDispatch();

    const [maxdatefi, setmaxdatefi] = useState(today);
    const [mindateff, setmindateff] = useState(newmin);

    const [finalDate, setfinalDate] = useState(today)
    const [initialDate, setinitialDate] = useState(newmin);

    const newmaxdate = (data) => {
        setfinalDate(data) 
        setmaxdatefi(data)
    }

    const newmindate = (data) => {
        setinitialDate(data)
        setmindateff(data)
    }
    
    const buscarfecha = () =>{
        var final = finalDate.toLocaleDateString();
        var inicial = initialDate.toLocaleDateString();
        if(final==inicial && hinicial>=hfinal){
            alert('La fecha final no puede ser menor a la inical')
            return
        }
        var final = final.split('/').reverse().join('-');
        var inicial = inicial.split('/').reverse().join('-');
        var inicialcompleto= inicial+'T'+hinicial;
        var finalcompleto = final+'T'+hfinal;
        dispatch(searchDatesPolilinewtime(inicialcompleto,finalcompleto))
    } 
    
    return (
        <Box>
            <Box
            className='calendario'
            >
                <Typography variant='h6' marginBottom={'10px'}> Fecha de inicio</Typography>
                <strong>Hora inicial por defecto: 00:00:00</strong>
                <form style={{marginBottom:'10px'}}>
                    <input
                        type="time"
                        step="1"
                        placeholder="Time"
                        onChange={(ev) =>{sethinicial(ev.target.value)}}
                    />
                </form>
                <Calendar margin='auto'onChange={newmindate} value={initialDate} maxDate={maxdatefi} minDate={newmin}/>
                <Typography variant='h6' marginBottom={'10px'} marginTop={'10px'}>Fecha final</Typography>
                <strong>Hora final por defecto: 23:59:59</strong>
                <form style={{marginBottom:'10px'}}>
                    <input
                        type="time"
                        step="1"
                        placeholder="Time"
                        onChange={(ev) =>{sethfinal(ev.target.value)}}
                    />
                </form>
                <Calendar onChange={newmaxdate} value={finalDate} maxDate={today} minDate={mindateff}/>
                <Button 
                    variant="contained"
                    sx={{marginTop:'10px'}}
                    onClick={buscarfecha}
                >
                    Buscar
                </Button>
            </Box>
        </Box>
        
    )
}