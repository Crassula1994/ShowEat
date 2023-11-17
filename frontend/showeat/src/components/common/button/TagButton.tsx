/* Import */
import { ButtonProps } from "@customTypes/commonProps";
import { changeFontWeight } from "@utils/format";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TagButtonProps extends ButtonProps {
    text: string;
    colorType?: "primary" | "secondary" | "green" | "red" | "gray";
    textColor?: string;
    fontSize?: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const TagButtonWrapper = styled("div")<Partial<TagButtonProps>>`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    box-sizing: border-box;
    padding: 0.5em 1em;

    // Style Attribute
    border-radius: 15px;
    background-color: ${(props) => {
        if (props.colorType === "green") {
            return props.theme.colors.normalGreen;
        }
        if (props.colorType === "red") {
            return props.theme.colors.normalRed;
        }
        return props.theme.colors[`${props.colorType}3`];
    }};

    // Text Attribute
    text-align: center;
`;

const TagTextWrapper = styled("div")<Partial<TagButtonProps>>`
    // Box Model Attribute
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;

    // Text Attribute
    text-overflow: ellipsis;
    font-size: ${(props) => props.fontSize};
    span {
        font-size: ${(props) => props.fontSize};
    }
    color: ${(props) => props.textColor};
`;

// ----------------------------------------------------------------------------------------------------

/* Tag Button Component */
function TagButton(props: TagButtonProps) {
    // States and Variables
    const {
        width,
        height = "auto",
        text,
        colorType = "primary",
        textColor = "black",
        fontSize = "16px",
    } = props;
    const formattedText = changeFontWeight(text);

    return (
        <TagButtonWrapper width={width} height={height} colorType={colorType}>
            <TagTextWrapper
                dangerouslySetInnerHTML={{ __html: formattedText }}
                textColor={textColor}
                fontSize={fontSize}
            />
        </TagButtonWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TagButton;
