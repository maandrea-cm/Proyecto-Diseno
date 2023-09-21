import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { yellowTheme } from "./yellowTheme"

export const AppTheme = ({children}) => {
    return (
        <ThemeProvider theme={yellowTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}