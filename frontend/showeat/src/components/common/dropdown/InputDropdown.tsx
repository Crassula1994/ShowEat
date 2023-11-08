/* Import */
import { ChangeEvent, useEffect, useState } from "react";
import { DropdownProps } from "@customTypes/commonProps";
import Image from "next/image";
import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface InputDropdownProps extends DropdownProps {
    id: string;
    name?: string;
    value: string;
    placeholder?: string;
    required: boolean;
    labelText?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface IsOpenTypes extends InputDropdownProps {
    isOpen: boolean;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const dropDownFadein = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

const dropDownFadeOut = keyframes`
    from {
        opacity: 1;
        transform: translateY(0px);
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
`;

const DropdownContainer = styled("div")`
    // Position Attribute
    position: "relative";

    // Box Model Attribute
    width: 100%;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const LabelWrapper = styled("label")`
    // Box Model Attribute
    width: 100%;

    // Text Attribute
    font-size: 18px;
    font-weight: 700;
`;

const ButtonContainer = styled("div")<Partial<IsOpenTypes>>`
    // Layout Attribute
    display: flex;
    justify-content: space-between;
    align-items: center;

    // Box Model Attribute
    margin-top: 0.5em;

    // Style Attribute
    border: 2px solid ${(props) => props.theme.colors.gray3};
    border-color: ${(props) => (props.isOpen ? "transparent" : `${props.theme.colors.gray3}`)};
    border-radius: 15px;
    background-color: white;
    box-shadow: ${(props) =>
        props.isOpen
            ? `0 0 5px 2px ${props.theme.colors.primary2},
        0 0 0 2px ${props.theme.colors.primary3}`
            : "none"};

    // Interaction Attribute
    cursor: pointer;
    &:hover {
        border-color: transparent;
        box-shadow:
            0 0 5px 2px ${(props) => props.theme.colors.primary2},
            0 0 0 2px ${(props) => props.theme.colors.primary3};
    }
`;

const InputWrapper = styled("input")`
    // Box Model Attribute
    width: 100%;
    box-sizing: border-box;
    padding: 0.5em 1em;
    overflow: hidden;

    // Style Attribute
    border: none;
    outline: none;
    background-color: transparent;

    // Text Attribute
    color: black;
    white-space: nowrap;
    text-overflow: ellipsis;

    // Interaction Attribute
    cursor: pointer;
`;

const IconWrapper = styled(Image)`
    // Box Model Attribute
    margin-right: 1em;
`;

const ListWrapper = styled("div")<Partial<IsOpenTypes>>`
    // Postion Attribute
    position: absolute;
    z-index: 200;

    // Layout Attribute
    display: flex;
    justify-content: center;
    align-items: center;

    // Box Model Attribute
    width: ${(props) => props.width};
    box-sizing: border-box;
    padding: 0.6em 0 0.6em 0.6em;
    margin-top: 1em;

    // Style Attribute
    border-radius: 15px;
    background-color: white;
    box-shadow:
        0 0 5px 2px ${(props) => props.theme.colors.primary2},
        0 0 0 2px ${(props) => props.theme.colors.primary3};

    animation: ${(props) => (props.isOpen ? dropDownFadein : dropDownFadeOut)} 0.5s ease-in-out
        forwards;
`;

const ItemContainer = styled("div")<{ height: string }>`
    // Box Model Attribute
    width: 100%;
    max-height: ${(props) => props.height};
    min-height: 5em;
    overflow-y: scroll;
`;

const ItemWrapper = styled("div")`
    // Box Model Attribute
    width: 100%;
    box-sizing: border-box;
    padding: 0.5em 1em;
    overflow: hidden;

    // Text Attribute
    white-space: nowrap;
    text-overflow: ellipsis;

    // Style Attribute
    border-radius: 10px;

    // Interaction Attribute
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.colors.primary4};
        color: white;
        font-weight: 700;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Input Dropdown Component */
function InputDropdown(props: InputDropdownProps) {
    const {
        width,
        height = "10em",
        id,
        name = id,
        value,
        placeholder = "",
        required = false,
        labelText = "",
        itemList,
        onChange,
    } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string>(value);

    useEffect(() => {
        if (!isOpen) {
            const timeoutId = setTimeout(() => setIsOpen(false), 300);
            return () => clearTimeout(timeoutId);
        }
        return undefined;
    }, [isOpen]);

    useEffect(() => {
        setSelectedItem(value);
    }, [value]);

    const handleSelection = (item: string) => {
        setSelectedItem(item);
        setIsOpen(false);
        if (onChange) {
            const selectEvent = {
                target: {
                    value: item,
                    name,
                },
            } as ChangeEvent<HTMLInputElement>;
            onChange(selectEvent);
        }
    };

    return (
        <DropdownContainer>
            {labelText && <LabelWrapper htmlFor={id}>{labelText}</LabelWrapper>}
            <ButtonContainer isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <InputWrapper
                    id={id}
                    name={name}
                    value={selectedItem}
                    placeholder={placeholder}
                    readOnly
                    required={required}
                    onChange={onChange}
                />
                <IconWrapper
                    src="/assets/icons/down-arrow-icon.svg"
                    width={20}
                    height={20}
                    alt="dropdown-icon"
                />
            </ButtonContainer>
            {isOpen && (
                <ListWrapper width={width} isOpen={isOpen}>
                    <ItemContainer height={height}>
                        {itemList.map((content, index) => (
                            <ItemWrapper key={index} onClick={() => handleSelection(content)}>
                                {content}
                            </ItemWrapper>
                        ))}
                    </ItemContainer>
                </ListWrapper>
            )}
        </DropdownContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default InputDropdown;
