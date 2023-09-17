import React from 'react'
import { PagesRoutes } from '../paginas/routes/PagesRoutes';
import { Route, Routes } from 'react-router-dom';

export const AppRouter = () => {

    return (
        <>
            <Routes>
                <Route path='/*' element={<PagesRoutes/>}/>
            </Routes>
        </>
        
        
    )
}