/* Import */
import { ButtonProps } from "@customTypes/commonProps";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TagButtonProps extends ButtonProps {
    tagDescription: string;
    buttonColor: string;
    // eslint-disable-next-line react/require-default-props
    textColor?: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const TagButtonWrapper = styled("div")<ButtonProps & { buttonColor: string }>`
    max-width: ${(props) => props.width};
    min-width: 50px;
    height: ${(props) => props.height};

    display: inline-block;
    border-radius: 10px;
    background-color: ${(props) => props.buttonColor};
    padding: 5px 10px;

    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TagText = styled("span")<{ textColor: string }>`
    max-width: 100%;

    font-size: 14px;
    color: ${(props) => props.textColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

function TagButton({
    width,
    height,
    tagDescription,
    buttonColor,
    textColor = "black",
}: TagButtonProps) {
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
        <TagButtonWrapper width={width} height={height} buttonColor={buttonColor}>
            <TagText dangerouslySetInnerHTML={{ __html: fixedDescription }} textColor={textColor} />
        </TagButtonWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TagButton;
