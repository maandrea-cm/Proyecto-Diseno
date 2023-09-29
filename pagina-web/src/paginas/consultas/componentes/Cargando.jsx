import React from 'react'
import { CircularProgress, Grid } from '@mui/material'

export const Cargando = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems='center'
            justifyContent='center'
            sx={{minHeight:'100vh',minWidth:'100vh',backgroundColor:'#feeb00',padding:4}}
        >
            <Grid container
                alignContent='center' justifyContent= 'center'>
                <CircularProgress color='warning'/>
            </Grid>
        </Grid>
    )
}


