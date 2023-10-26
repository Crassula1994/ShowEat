/* Import */
import Textarea from "@/components/common/input/Textarea";
import Head from "next/head";
import { useState } from "react";

// ----------------------------------------------------------------------------------------------------

/* Home Component */
function Home() {
    const [textValue, setTextValue] = useState("");

    console.log(textValue);

    return (
        <>
            <Head>
                <title>쑈잇: ShowEat</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                구건, 그는 신인가!
                <Textarea
                    id="review"
                    width="200px"
                    height="100px"
                    maxLength={200}
                    textareaName="안녕하세요"
                    setTextValue={setTextValue}
                />
            </main>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Home;
