/* Import */
import { ButtonProps } from "@customTypes/commonProps";
import styled from "@emotion/styled";
import React from "react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TextButtonProps extends ButtonProps {
    text: string;
    fontSize?: number;
    colorType?: "primary" | "secondary" | "gray";
    fill?: "positive" | "negative";
    curve?: "curved" | "round";
    icon?: React.ReactElement;
}

interface ButtonContainerType extends ButtonProps {
    colorType: "primary" | "secondary" | "gray";
    curve: "curved" | "round";
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ButtonContainer = styled("div")<ButtonContainerType>`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3%;

    // Box Model Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    // Style Attribute
    border-radius: ${(props) => (props.curve === "curved" ? "20px" : props.height)};

    // Text Attribute
    color: ${(props) => (props.colorType === "secondary" ? "white" : "black")};

    // Interaction Attribute
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.02);
    }
    &:active {
        transform: scale(0.98);
    }

    // Positive Fill Attribute
    &.positive {
        background-color: ${(props) => props.theme.colors[`${props.colorType}3`]};
        border-color: transparent;
        font-weight: 700;
        &:hover {
            background-color: ${(props) => props.theme.colors[`${props.colorType}4`]};
            color: white;
        }
    }

    // Negative Fill Attribute
    &.negative {
        background-color: transparent;
        box-shadow: 0 0 0 3px ${(props) => props.theme.colors[`${props.colorType}3`]} inset;
        color: ${(props) => props.theme.colors[`${props.colorType}3`]};
        &:hover {
            border-color: ${(props) => props.theme.colors[`${props.colorType}4`]};
            background-color: ${(props) => props.theme.colors[`${props.colorType}4`]};
            box-shadow: 0 0 0 3px ${(props) => props.theme.colors[`${props.colorType}4`]} inset;
            color: white;
            font-weight: 700;
        }
    }
`;

const TextWrapper = styled("div")<{ fontSize: number }>`
    // Text Attribute
    font-size: ${(props) => props.fontSize}px;
`;

const ImageWrapper = styled("div")`
    // Box Model Attribute
    max-width: 30px;
    max-height: 30px;
`;

// ----------------------------------------------------------------------------------------------------

/* Text Button Component */
function TextButton(props: TextButtonProps) {
    const {
        width,
        height = "50px",
        onClick,
        fontSize = 20,
        text,
        colorType = "primary",
        fill = "positive",
        curve = "curved",
        icon,
    } = props;

    return (
        <ButtonContainer
            width={width}
            height={height}
            onClick={onClick}
            colorType={colorType}
            className={fill}
            curve={curve}
        >
            <ImageWrapper>{icon}</ImageWrapper>
            <TextWrapper fontSize={fontSize}>{text}</TextWrapper>
        </ButtonContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TextButton;