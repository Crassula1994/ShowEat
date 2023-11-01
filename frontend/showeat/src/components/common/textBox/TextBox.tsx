/* Import */
import { breakTextLine, changeFontWeight } from "@utils/format";
import styled from "@emotion/styled";
import { TextBoxProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Style */
const TextWrapper = styled("div")<Partial<TextBoxProps>>`
    // Box Model Attribute
    width: 100%;
    box-sizing: border-box;
    padding: 1em 1.5em;

    // Style Attribute
    border: 3px solid ${(props) => props.theme.colors[`${props.colorType}3`]};
    border-radius: 20px;
    background-color: white;

    // Text Attribute
    font-size: ${(props) => props.fontSize}px;
    span {
        font-size: ${(props) => props.fontSize}px;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Text Box Component */
function TextBox(props: TextBoxProps) {
    // States and Variables
    const { text, colorType = "primary", fontSize = 16 } = props;
    const styledText = breakTextLine(changeFontWeight(text));

    return (
        <TextWrapper
            dangerouslySetInnerHTML={{ __html: styledText }}
            colorType={colorType}
            fontSize={fontSize}
        />
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TextBox;
