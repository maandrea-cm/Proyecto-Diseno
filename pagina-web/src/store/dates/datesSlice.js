import { createSlice } from '@reduxjs/toolkit';

export const datesSlice = createSlice({
    name: 'name',
    initialState: {
        id:'',
        date: '',
        time: '',
        long:'',
        lat: '',
        lasid: localStorage.getItem("lastId")
        ? localStorage.getItem("lastId")
        : 0,
        polireal: localStorage.getItem("polireal")
        ? JSON.parse(localStorage.getItem("polireal"))
        : [],
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
                localStorage.setItem("polireal", JSON.stringify(state.polireal));
                state.lasid=action.payload.IdEnvio;
                localStorage.removeItem("lasId");
                localStorage.setItem("lastId", state.lasid);
            };
        },
        limpiarpoli:(state) => {
            state.lasid = 0
            state.polireal= [];
        }
    }
});

export const { 

    searchingDates,
    limpiarpoli

} = datesSlice.actions;