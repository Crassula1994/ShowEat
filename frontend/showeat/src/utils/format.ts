/* Function for Line Breaking Text by '\n' */
function breakTextLine(text: string): string {
    return text
        .split("\n")
        .map((line) => line)
        .join("<br />");
}

/* Function for Changing Font Weight */
function changeFontWeight(text: string): string {
    const thinText = text.match(/---(.*?)---/g);
    const boldText = text.match(/\.\.\.(.*?)\.\.\./g);

    let weightedText = text;

    if (thinText) {
        thinText.forEach((phrase: string) => {
            weightedText = weightedText.replace(
                phrase,
                `<span style="font-weight: 300;">${phrase.substring(3, phrase.length - 3)}</span>`,
            );
        });
    }

    if (boldText) {
        boldText.forEach((phrase: string) => {
            weightedText = weightedText.replace(
                phrase,
                `<span style="font-weight: 700;">${phrase.substring(3, phrase.length - 3)}</span>`,
            );
        });
    }

    return weightedText;
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
export { breakTextLine, changeFontWeight, parseNumber };
