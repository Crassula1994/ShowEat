/* Import */
import type { AppProps } from "next/app";
import { Global, ThemeProvider } from "@emotion/react";
import globalStyles from "@styles/global";
import theme from "@styles/theme";

// ----------------------------------------------------------------------------------------------------

/* App Component */
function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Global styles={globalStyles} />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default App;
