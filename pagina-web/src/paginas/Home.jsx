import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from '../componentes/Table'
import { ReactMap } from '../componentes/mapa/ReactMap'
import { Cargando } from '../componentes/Cargando'
import {searchDates} from '../store/dates/thunks'
import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

export const Home = () => {
    const dispatch=useDispatch();
    setInterval(() => {
        dispatch(searchDates())
    }, 1000);

    const removeLocal = () =>{
        localStorage.removeItem("polireal");
        localStorage.removeItem("lastId")   
    }

    const Datos = useSelector(state => state.dates)
    
    if (Datos.id!="") 
        return (
            <>
                <Table {...Datos}/>
                <ReactMap {...Datos}/>
                <IconButton
                    onClick={removeLocal}
                    size="large"
                    sx={{
                        zIndex:100,
                        color:"white",
                        backgroundColor:'red',
                        ':hover': {backgroundColor:'red',opacity:0.7},
                        position:'fixed',
                        right:'10vh',
                        bottom:50
                        }}
                >
                    <AddOutlined sx={{fontSize:30}}/>
                </IconButton>
            </>
        )
    return (
        <Cargando/>
    )
}
