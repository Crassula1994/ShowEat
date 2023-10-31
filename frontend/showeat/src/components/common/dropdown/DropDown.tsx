/* Import */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
import { useEffect, useState } from "react";
import Image from "next/image";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface DropDownProps {
    dropDownList: string[];
    color: "primary" | "secondary" | "gray";
    placeHolder?: string;
    maxWidth?: string;
    maxHeight?: string;
    fontSize?: string;
    onClick?: (content: string) => void;
}

interface IsOpenTypes extends DropDownProps {
    isOpen: boolean;
}

interface DropDownLiTypes {
    idx: number;
    listLength: number;
    fontSize: string;
    maxWidth: string;
    color: "primary" | "secondary" | "gray";
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

const DropDownContainer = styled("div")`
    position: "relative";

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const DropDownButtonContainer = styled("div")<Partial<IsOpenTypes>>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    min-height: 20px;

    min-width: ${(props) => props.maxWidth};
    max-width: ${(props) => props.maxWidth};

    border: 1px solid ${(props) => props.theme.colors[`${props.color}3`]};
    border-radius: 10px;
    box-shadow: ${(props) =>
        props.isOpen ? `0px 0px 5px 1px ${props.theme.colors[`${props.color}3`]}` : "none"};

    background-color: white;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    cursor: pointer;

    &:hover {
        box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors[`${props.color}2`]};
        background-color: ${(props) => props.theme.colors[`${props.color}1`]};
    }

    &:active {
        box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors[`${props.color}3`]};
        background-color: ${(props) => props.theme.colors[`${props.color}2`]};
    }
`;

const DropDownButtonTextWrapper = styled("span")<{ maxWidth: string; fontSize: string }>`
    max-width: calc(${(props) => props.maxWidth} - 20px);

    padding: 0.5em 1em;

    font-size: ${(props) => props.fontSize};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const DropDownButtonIconWrapper = styled(Image)`
    padding: 0.5em 1em;
`;

const DropDownInnerWrapper = styled("div")<Partial<DropDownProps>>`
    max-width: ${(props) => props.maxWidth};
    max-height: ${(props) => props.maxHeight};

    overflow-y: ${(props) => (props.maxHeight ? "scroll" : "visible")};
`;

const DropDownOuterWrapper = styled("div")<Partial<IsOpenTypes>>`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${(props) => props.theme.colors[`${props.color}3`]};
    border-radius: 10px;
    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors[`${props.color}2`]};

    background-color: white;

    margin-top: 5px;

    z-index: 1000;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    animation: ${(props) => (props.isOpen ? dropDownFadein : dropDownFadeOut)} 0.2s ease-in-out
        forwards;
`;

const DropDownLiContainer = styled("ul")`
    list-style: none;
`;

const DropDownLiWrapper = styled("li")<DropDownLiTypes>`
    max-width: calc(${(props) => props.maxWidth} - 10px);
    max-width: calc(${(props) => props.maxWidth} - 10px);

    padding: 0.5em 1em;

    font-size: ${(props) => props.fontSize};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    cursor: pointer;

    border-radius: ${(props) => {
        if (props.idx === 0) {
            return "10px 10px 0px 0px";
        }
        if (props.idx === props.listLength - 1) {
            return "0px 0px 10px 10px";
        }
        return "none";
    }};

    &:hover {
        background-color: ${(props) => props.theme.colors[`${props.color}3`]};
        color: white;
        text-shadow: 0px 0px 5px 5px black;
    }

    &:active {
        background-color: ${(props) => props.theme.colors[`${props.color}4`]};
        color: white;
        text-shadow: 0px 0px 5px 5px black;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Drop Down Component */
function DropDown({
    dropDownList,
    color,
    placeHolder = "-",
    maxWidth = "500px",
    maxHeight,
    fontSize = "14px",
    onClick,
}: DropDownProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isHidden, setIsHidden] = useState<boolean>(false);

    const [isSeletedText, setIsSelectedText] = useState<string>("");

    useEffect(() => {
        if (!isOpen) {
            const hideTimeOut = setTimeout(() => {
                setIsHidden(true);
            }, 300);
            return () => {
                clearTimeout(hideTimeOut);
            };
        }
        if (isOpen) {
            setIsHidden(false);
        }
        return undefined;
    }, [isOpen]);

    useEffect(() => {
        setIsSelectedText(placeHolder);
    }, [placeHolder]);

    const handleLiContent = (content: string) => {
        setIsSelectedText(content);
    };

    return (
        <DropDownContainer>
            <DropDownButtonContainer
                onClick={() => setIsOpen(!isOpen)}
                color={color}
                maxWidth={maxWidth}
                isOpen={isOpen}
            >
                <DropDownButtonTextWrapper maxWidth={maxWidth} fontSize={fontSize}>
                    {isSeletedText}
                </DropDownButtonTextWrapper>
                <DropDownButtonIconWrapper
                    src="/assets/icons/down-arrow-icon.svg"
                    alt="drop-down-down-icon"
                    width={20}
                    height={20}
                />
            </DropDownButtonContainer>
            {!isHidden && (
                <DropDownOuterWrapper isOpen={isOpen} color={color}>
                    <DropDownInnerWrapper maxWidth={maxWidth} maxHeight={maxHeight}>
                        <DropDownLiContainer>
                            {dropDownList.map((content, idx) => (
                                <DropDownLiWrapper
                                    key={`dropdown-li-${content}-${idx + 1}`}
                                    idx={idx}
                                    listLength={dropDownList.length}
                                    fontSize={fontSize}
                                    maxWidth={maxWidth}
                                    color={color}
                                    onClick={() => {
                                        if (onClick) {
                                            onClick(content);
                                            handleLiContent(content);
                                        }
                                    }}
                                >
                                    {content}
                                </DropDownLiWrapper>
                            ))}
                        </DropDownLiContainer>
                    </DropDownInnerWrapper>
                </DropDownOuterWrapper>
            )}
        </DropDownContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default DropDown;
