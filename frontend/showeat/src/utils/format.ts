/* Function for Changing Font Weight */
function changeFontWeight(description: string) {
    // ...텍스트... 처럼 ... 사이에 있는 텍스트들을 찾아서 font-weight를 바꾼 span태그로 만들어줌.
    // ...사이에 있는건 fw 700, --- 사이에 있는건 fw 300
    const thinText = description.match(/---(.*?)---/g);
    const boldText = description.match(/\.\.\.(.*?)\.\.\./g);

    let fixedDescription = description;

    if (thinText) {
        thinText.forEach((text: string) => {
            fixedDescription = fixedDescription.replace(
                text,
                `<span style="font-weight: 300; font-size: 14px;">${text.substring(
                    3,
                    text.length - 3,
                )}</span>`,
            );
        });
    }

    if (boldText) {
        boldText.forEach((text: string) => {
            fixedDescription = fixedDescription.replace(
                text,
                `<span style="font-weight: 700; font-size: 14px;">${text.substring(
                    3,
                    text.length - 3,
                )}</span>`,
            );
        });
    }

    return fixedDescription;
}

/* Function for Extracting and Parsing Number */
function parseNumber(text: string): number {
    const numStrArray = text.match(/\d+/);

    if (!numStrArray || numStrArray.length === 0) {
        return 50;
    }

    return parseInt(numStrArray[0], 10);
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export { changeFontWeight, parseNumber };
