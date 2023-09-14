import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from '../componentes/Table'
import { ReactMap } from '../componentes/mapa/ReactMap'
import { Cargando } from '../componentes/Cargando'
import {searchDates} from '../store/dates/thunks'

export const Home = () => {
    const dispatch=useDispatch();
    setInterval(() => {
        dispatch(searchDates())
    }, 1000);


    const Datos = useSelector(state => state.dates)
    
    if (Datos.id!="") 
        return (
            <>
                <Table {...Datos}/>
                <ReactMap {...Datos}/>
            </>
        )
    return (
        <Cargando/>
    )
}
