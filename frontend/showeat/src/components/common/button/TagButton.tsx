/* Import */
import { ButtonProps } from "@customTypes/commonProps";
import { changeFontWeight } from "@utils/format";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TagButtonProps extends ButtonProps {
    tagDescription: string;
    colorType?: "primary" | "secondary" | "gray";
    textColor?: string;
    fontSize?: string;
    fontWeight?: number;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const TagButtonWrapper = styled("div")<ButtonProps & { colorType: string }>`
    display: inline-block;

    width: ${(props) => props.width};
    height: ${(props) => props.height};

    box-sizing: border-box;

    padding: 5px 10px;
    border-radius: 10px;
    border: ${(props) =>
        props.colorType && props.colorType !== "white"
            ? "none"
            : `1px solid ${props.theme.colors.gray2}`};
    background-color: ${(props) =>
        props.colorType ? props.theme.colors[`${props.colorType}3`] : "none"};

    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TagText = styled("span")<Partial<TagButtonProps>>`
    max-width: 100%;

    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};

    color: ${(props) => props.textColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

// ----------------------------------------------------------------------------------------------------

/* Tag Button Component */
function TagButton({
    width,
    height,
    tagDescription,
    colorType = "primary",
    textColor = "black",
    fontSize = "14px",
    fontWeight = 700,
}: TagButtonProps) {
    const fixedDescription = `#${changeFontWeight(tagDescription)}`;

    return (
        <TagButtonWrapper width={width} height={height} colorType={colorType}>
            <TagText
                dangerouslySetInnerHTML={{ __html: fixedDescription }}
                textColor={textColor}
                fontSize={fontSize}
                fontWeight={fontWeight}
            />
        </TagButtonWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TagButton;
