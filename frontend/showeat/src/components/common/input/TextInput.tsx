/* Import */
import { TextInputProps } from "@customTypes/commonProps";
import styled from "@emotion/styled";
import Image from "next/image";
import { memo, useRef } from "react";

// ----------------------------------------------------------------------------------------------------

const TextInputContainer = styled("div")<{ width: string }>`
    width: ${(props) => props.width};
`;

const TextInputWrapper = styled("input")`
    width: 100%;
    border: none;
    outline: none;
    font-size: 16px;
    z-index: 1000;
`;

const IconWrapper = styled(Image)`
    max-width: 50px;
    max-height: 50px;
    cursor: pointer;
    z-index: 100;

    user-select: none;
`;

const TextIconContainer = styled("div")<{ error: boolean }>`
    max-width: 100%;
    box-shadow: ${(props) =>
        props.error
            ? `0px 0px 4px 2px ${props.theme.colors.normalRed}`
            : `0px 0px 4px 2px ${props.theme.colors.gray5}`};
    border-radius: 10px;
    padding: 10px 20px;
    margin-top: 5px;
    display: flex;
    gap: 10px;
    z-index: 90;
    &:focus-within {
        box-shadow: 0px 0px 4px 2px ${(props) => props.theme.colors.primary3};
    }
`;

const LabelWrapper = styled("label")<{ labelFontSize: string }>`
    width: 100%;
    font-weight: 700;
    font-size: ${(props) => props.labelFontSize};

    margin-left: 0.5em;
`;

function TextInput({
    width,
    id,
    placeholder,
    setTextValue,
    defaultValue,
    labelName,
    iconUrl,
    error = false,
    labelFontSize = "20px",
    onClick,
}: TextInputProps) {
    const textInputRef = useRef<HTMLInputElement | null>(null);

    const handleTextInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setTextValue(newValue);
    };

    const handleTextIconContainer = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onClick) {
            onClick();
        }
    };

    return (
        <TextInputContainer width={width}>
            {labelName && (
                <LabelWrapper htmlFor={id} labelFontSize={labelFontSize}>
                    {labelName}
                </LabelWrapper>
            )}

            <TextIconContainer onClick={handleTextIconContainer} error={error}>
                <TextInputWrapper
                    ref={textInputRef}
                    type="text"
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={(e) => handleTextInputValue(e)}
                    onKeyUp={(e) => handleEnter(e)}
                />
                {iconUrl && (
                    <IconWrapper
                        src={iconUrl}
                        alt="SVG Icon"
                        width={30}
                        height={30}
                        onClick={onClick}
                    />
                )}
            </TextIconContainer>
        </TextInputContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */

export default memo(TextInput);
