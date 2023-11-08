/* Import */
import { ChangeEvent, MouseEvent, KeyboardEvent, useRef } from "react";
import { InputProps } from "@customTypes/commonProps";
import styled from "@emotion/styled";
import Image from "next/image";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TextInputProps extends InputProps {
    value: string;
    placeholder?: string;
    required?: boolean;
    labelText?: string;
    source?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const InputContainer = styled("div")<{ width: string; height: string }>`
    // Box Model Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    min-width: 150px;
`;

const LabelWrapper = styled("label")`
    // Box Model Attribute
    width: 100%;

    // Text Attribute
    font-size: 18px;
    font-weight: 700;
`;

const InputBox = styled("div")`
    // Layout Attribute
    display: flex;

    // Box Model Attribute
    width: 100%;
    box-sizing: border-box;
    margin-top: 0.5em;
    padding: 0.5em 1em;

    // Style Attribute
    border: 2px solid ${(props) => props.theme.colors.gray3};
    border-radius: 15px;
    &:focus-within {
        border-color: transparent;
        box-shadow:
            0 0 5px 2px ${(props) => props.theme.colors.primary2},
            0 0 0 2px ${(props) => props.theme.colors.primary3};
    }
`;

const InputWrapper = styled("input")`
    // Box Model Attribute
    width: 100%;

    // Style Attribute
    border: none;
    outline: none;
`;

const IconWrapper = styled(Image)<{ "data-clickable": boolean }>`
    // Box Model Attribute
    max-width: 30px;
    max-height: 30px;

    // Interaction Attribute
    cursor: ${(props) => (props["data-clickable"] ? "pointer" : "default")};
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

// ----------------------------------------------------------------------------------------------------

/* Text Input Component */
function TextInput(props: TextInputProps) {
    const {
        width,
        height = "auto",
        id,
        name = id,
        value,
        placeholder = "",
        required = false,
        labelText = "",
        source = "",
        onClick = () => {},
        onChange = () => {},
        onKeyUp = () => {},
    } = props;
    const textInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <InputContainer width={width} height={height}>
            {labelText && <LabelWrapper htmlFor={id}>{labelText}</LabelWrapper>}

            <InputBox onClick={() => textInputRef.current?.focus()}>
                <InputWrapper
                    type="text"
                    ref={textInputRef}
                    id={id}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                />
                {source && (
                    <IconWrapper
                        src={source}
                        width={20}
                        height={20}
                        alt="input-icon"
                        data-clickable={id !== "phone"}
                        onClick={onClick}
                    />
                )}
            </InputBox>
        </InputContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TextInput;
