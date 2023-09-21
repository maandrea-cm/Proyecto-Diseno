import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const yellowTheme =createTheme({
    palette:{
        primary: {
            main: '#feeb00'
        },
        secondary: {
            main: '#fdff4d'
        },
        error:{
            main: red.A400
        }
    },
})