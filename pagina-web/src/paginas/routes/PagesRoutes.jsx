import React from 'react'
import { Consultas } from '../consultas/Consultas'
import { Navigate, Route,Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Cargando } from '../consultas/componentes/Cargando'
import { TiempoReal } from '../tiemporeal/TiempoReal'

export const PagesRoutes = () => {
    var {id} = useSelector(state => state.dates)
    if (id=="") return (<Cargando/>)
    return (
        <>
            <Routes>
                    <Route path="consultas" element={<Consultas />} />
                    <Route path="home" element={<TiempoReal/>} />              
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path='/*' element={<Navigate to='/'/>}/>
            </Routes>
        </>
    )
}