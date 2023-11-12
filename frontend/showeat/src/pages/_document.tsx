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
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js" />
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
