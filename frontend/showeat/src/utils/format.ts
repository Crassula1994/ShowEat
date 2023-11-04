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

/* Function for Calculate Remaining Time */
function calcRemainTime(targetDate: string) {
    const currentDate = new Date();
    const parsedTargetDate = new Date(targetDate);
    const timeRemaining = parsedTargetDate.getTime() - currentDate.getTime();

    if (timeRemaining < 0) {
        return "이미 마감되었습니다";
    }
    if (timeRemaining === 0) {
        return "오늘이 마감!";
    }

    const secondsRemaining = Math.floor(timeRemaining / 1000);
    if (secondsRemaining >= 86400) {
        const daysRemaining = Math.floor(secondsRemaining / 86400);
        return `${daysRemaining}일`;
    }
    if (secondsRemaining >= 3600) {
        const hoursRemaining = Math.floor(secondsRemaining / 3600);
        return `${hoursRemaining}시간`;
    }
    if (secondsRemaining >= 60) {
        const minutesRemaining = Math.floor(secondsRemaining / 60);
        return `${minutesRemaining}분`;
    }
    return `${secondsRemaining}초`;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export { breakTextLine, changeFontWeight, parseNumber, calcRemainTime };
