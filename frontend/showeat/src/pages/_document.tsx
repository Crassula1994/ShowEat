/* Import */
import { Html, Head, Main, NextScript } from "next/document";

// ----------------------------------------------------------------------------------------------------

/* Document Component */
function Document() {
    return (
        <Html lang="ko">
            <Head>
                <meta
                    name="description"
                    content="소비자와 소상공인을 잇는 펀딩 플랫폼, 쑈잇입니다."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Document;
