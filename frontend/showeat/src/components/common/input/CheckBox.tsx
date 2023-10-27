/* Import */
import styled from "@emotion/styled";
import { InputProps } from "@customTypes/commonProps";
import { CheckMarkIcon } from "public/assets/icons";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface CheckBoxProps extends InputProps {
    text: string;
    isChecked: boolean;
    onToggle: (isChecked: boolean) => void;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const InputContainer = styled("div")<Partial<CheckBoxProps>>`
    // Box Model Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`;

const HiddenInputWrapper = styled("input")`
    // Position Attribute
    position: absolute;

    // Box Model Attribute
    width: 0;
    height: 0;

    // Style Attribute
    opacity: 0;
`;

const LabelContainer = styled("label")`
    // Layout Attribute
    display: flex;
    align-items: center;
    gap: 10px;

    // Interaction Attribute
    cursor: pointer;
`;

const StyledInputWrapper = styled("div")<Partial<CheckBoxProps>>`
    // Layout Attribute
    display: inline-block;

    // Box Model Attribute
    width: 20px;
    height: 20px;

    // Style Attribute
    border: 2px solid ${(props) => props.theme.colors.primary3};
    border-radius: 8px;
    background-color: ${(props) => (props.isChecked ? props.theme.colors.primary3 : "transparent")};

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    transition: 0.3s all ease-out;
    svg {
        visibility: ${(props) => (props.isChecked ? "visible" : "hidden")};
    }
    &:hover {
        background-color: ${(props) => props.theme.colors.primary4};
        border-color: ${(props) => props.theme.colors.primary4};
    }
`;

const TextWrapper = styled("div")`
    // Text Attribute
    font-weight: 700;
`;

// ----------------------------------------------------------------------------------------------------

/* Check Box Component */
function CheckBox(props: CheckBoxProps) {
    // States and Variables
    const { width, height = "auto", id, name = id, text, isChecked, onToggle } = props;

    // Functions
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onToggle(event.target.checked);
    };

    return (
        <InputContainer width={width} height={height}>
            <HiddenInputWrapper
                type="checkbox"
                id={id}
                name={name}
                checked={isChecked}
                onChange={handleChange}
            />
            <LabelContainer htmlFor={id}>
                <StyledInputWrapper isChecked={isChecked}>
                    <CheckMarkIcon />
                </StyledInputWrapper>
                <TextWrapper>{text}</TextWrapper>
            </LabelContainer>
        </InputContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default CheckBox;
