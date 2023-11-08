/* Import */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
import { useEffect, useState } from "react";

interface ButtonDropDownProps {
    buttonComponent: React.ReactNode;
    dropDownComponent: React.ReactNode;
    isOpen: boolean;
    color: "primary" | "secondary" | "gray";
    maxWidth?: string;
    maxHeight?: string;
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

const ButtonDropDownContainer = styled("div")`
    position: "relative";
`;

const ButtonDropDownButtonWrapper = styled("div")`
    position: "relative";

    background-color: white;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const ButtonDropDownInnerWrapper = styled("div")<Partial<ButtonDropDownProps>>`
    /* min-width: 100px;
    min-height: 100px; */
    max-width: ${(props) => props.maxWidth};
    max-height: ${(props) => props.maxHeight};

    overflow-y: ${(props) => (props.maxHeight ? "scroll" : "visible")};

    padding: 0.5em 1em;

    border-left: 2px solid ${(props) => props.theme.colors.gray1};
    border-right: 2px solid ${(props) => props.theme.colors.gray1};
`;

const ButtonDropDownOuterWrapper = styled("div")<Partial<ButtonDropDownProps>>`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid ${(props) => props.theme.colors[`${props.color}2`]};
    border-radius: 10px;
    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors[`${props.color}2`]};

    background-color: white;

    margin-top: 5px;
    padding: 1em;

    z-index: 1000;

    animation: ${(props) => (props.isOpen ? dropDownFadein : dropDownFadeOut)} 0.2s ease-in-out
        forwards;
`;

// ----------------------------------------------------------------------------------------------------

/* Button Drop Down Component */
function ButtonDropDown({
    buttonComponent,
    dropDownComponent,
    isOpen,
    color,
    maxWidth,
    maxHeight,
}: ButtonDropDownProps) {
    const [isHidden, setIsHidden] = useState(false);

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

    return (
        <ButtonDropDownContainer>
            <ButtonDropDownButtonWrapper>{buttonComponent}</ButtonDropDownButtonWrapper>
            {!isHidden && (
                <ButtonDropDownOuterWrapper isOpen={isOpen} color={color}>
                    <ButtonDropDownInnerWrapper maxWidth={maxWidth} maxHeight={maxHeight}>
                        {dropDownComponent}
                    </ButtonDropDownInnerWrapper>
                </ButtonDropDownOuterWrapper>
            )}
        </ButtonDropDownContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ButtonDropDown;
