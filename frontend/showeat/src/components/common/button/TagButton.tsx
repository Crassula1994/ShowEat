/* Import */
import { ButtonProps } from "@customTypes/commonProps";
import fontWeightChanger from "@/utils/fontWeightChanger";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TagButtonProps extends ButtonProps {
    tagDescription: string;
    // eslint-disable-next-line react/require-default-props
    buttonColor?: string;
    // eslint-disable-next-line react/require-default-props
    textColor?: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const TagButtonWrapper = styled("div")<ButtonProps & { buttonColor: string }>`
    display: inline-block;

    max-width: ${(props) => props.width};
    min-width: 50px;
    height: ${(props) => props.height};

    padding: 5px 10px;
    border-radius: 10px;
    border: ${(props) =>
        props.buttonColor && props.buttonColor !== "white"
            ? "none"
            : `1px solid ${props.theme.colors.gray2}`};
    background-color: ${(props) => (props.buttonColor ? props.buttonColor : "none")};

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

// ----------------------------------------------------------------------------------------------------

/* Tag Button Component */
function TagButton({
    width,
    height,
    tagDescription,
    buttonColor = "",
    textColor = "black",
}: TagButtonProps) {
    const fixedDescription = fontWeightChanger(tagDescription);

    return (
        <TagButtonWrapper width={width} height={height} buttonColor={buttonColor}>
            <TagText dangerouslySetInnerHTML={{ __html: fixedDescription }} textColor={textColor} />
        </TagButtonWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TagButton;
