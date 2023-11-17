/* Import */
import { AppPropsWithLayout } from "@customTypes/layoutProps";
import { Global, ThemeProvider } from "@emotion/react";
import globalStyles from "@styles/global";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import theme from "@styles/theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ----------------------------------------------------------------------------------------------------

/* Type */
declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Kakao: any;
    }
}

// ----------------------------------------------------------------------------------------------------

/* App Component */
function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <Global styles={globalStyles} />
                {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
        </RecoilRoot>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default App;
