import { createSlice } from '@reduxjs/toolkit';

export const datesSlice = createSlice({
    name: 'name',
    initialState: {
        id:'',
        date: '',
        time: '',
        long:'',
        lat: '',
        lasid: 0,
        polireal: [],
        datosconsulta:[],
        policonsultas:[]

    },
    reducers: {
        searchingDates: (state,action) =>{
            state.id=action.payload.IdEnvio;
            state.date=action.payload.Fecha.split('T')[0];
            state.time=action.payload.Hora;
            state.long=action.payload.Longitud;
            state.lat=action.payload.Latitud;
            if(state.lasid!=action.payload.IdEnvio){
                state.polireal.push(action.payload);
                state.lasid=action.payload.IdEnvio;
            };
        },
        polilineDates: (state,action) => {
            state.datosconsulta=action.payload;
            var polyline=[]
            state.datosconsulta.map(datos =>{
                var latlong=[datos.Latitud,datos.Longitud];
                polyline.push(latlong)
            })
            state.policonsultas=polyline;
        }
    }
});

export const { 

    searchingDates,
    polilineDates

} = datesSlice.actions;