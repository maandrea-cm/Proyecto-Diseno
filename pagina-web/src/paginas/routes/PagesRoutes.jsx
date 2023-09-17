import React from 'react'
import { Home } from '../Home'
import { Consultas } from '../Consultas'
import { Navigate, Route,Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Cargando } from '../../componentes/Cargando'

export const PagesRoutes = () => {
    var {id} = useSelector(state => state.dates)
    if (id=="") return (<Cargando/>)
    return (
        <>
            <Routes>
                    <Route path="consultas" element={<Consultas />} />
                    <Route path="home" element={<Home />} />              
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path='/*' element={<Navigate to='/'/>}/>
            </Routes>
        </>
    )
}