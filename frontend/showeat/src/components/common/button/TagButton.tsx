/* Import */
import { ButtonProps } from "@/types/commonProps";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

function TagButton({
    width,
    height,
    tagDescription,
    buttonColor,
}: ButtonProps & { tagDescription: string; buttonColor: string }) {
    const TagButtonWrapper = styled("div")<ButtonProps>`
        max-width: ${(props) => props.width};
        height: ${(props) => props.height};
        min-width: 50px;
        text-align: center;
        display: inline-block;
        border-radius: 10px;
        padding: 5px 10px;
        background-color: ${buttonColor};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `;

    const TagText = styled("span")`
        max-width: 100%;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `;

    // ...텍스트... 처럼 ... 사이에 있는 텍스트들을 찾아서 font-weight를 바꾼 span태그로 만들어줌.
    // ...사이에 있는건 fw 700, --- 사이에 있는건 fw 300
    const thinText = tagDescription.match(/---(.*?)---/g);
    const boldText = tagDescription.match(/\.\.\.(.*?)\.\.\./g);

    let fixedDescription = tagDescription;

    if (thinText) {
        thinText.forEach((text) => {
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
        boldText.forEach((text) => {
            fixedDescription = fixedDescription.replace(
                text,
                `<span style="font-weight: 700; font-size: 14px;">${text.substring(
                    3,
                    text.length - 3,
                )}</span>`,
            );
        });
    }

    return (
        <TagButtonWrapper width={width} height={height}>
            <TagText dangerouslySetInnerHTML={{ __html: fixedDescription }} />
        </TagButtonWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TagButton;
