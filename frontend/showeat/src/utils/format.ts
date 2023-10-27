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
export default parseNumber;
