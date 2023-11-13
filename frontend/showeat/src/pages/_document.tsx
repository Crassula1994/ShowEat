/* Import */
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

// ----------------------------------------------------------------------------------------------------

/* Document Component */
function Document() {
    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
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
                <Script
                    type="text/javascript"
                    strategy="beforeInteractive"
                    src="https://developers.kakao.com/sdk/js/kakao.min.js"
                />
                <Script
                    type="text/javascript"
                    strategy="beforeInteractive"
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`}
                />
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
