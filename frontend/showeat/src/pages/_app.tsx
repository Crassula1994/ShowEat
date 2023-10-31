/* Import */
import { AppProps } from "next/app";
import { Global, ThemeProvider } from "@emotion/react";
import globalStyles from "@styles/global";
import { RecoilRoot } from "recoil";
import theme from "@styles/theme";

// ----------------------------------------------------------------------------------------------------

/* App Component */
function App({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <Global styles={globalStyles} />
                <Component {...pageProps} />
            </ThemeProvider>
        </RecoilRoot>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default App;
