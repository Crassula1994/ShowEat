/* Import */
import { ButtonProps } from "@customTypes/commonProps";
import { GoogleIcon, KakaoIcon } from "public/assets/icons";
import { parseNumber } from "@utils/format";
import { ReactElement } from "react";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface LoginButtonProps extends ButtonProps {
    text: string;
    fontSize?: number;
    colorType: "kakao" | "google";
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ButtonContainer = styled("div")<Partial<LoginButtonProps>>`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;

    // Box Model Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    min-width: 260px;
    min-height: 50px;
    box-sizing: border-box;
    padding: 0 2em;

    // Style Attribute
    border-radius: 15px;
    &.kakao {
        background-color: ${(props) => props.theme.colors.kakao};
        border-color: transparent;
        &:hover {
            path {
                fill: white;
            }
        }
    }
    &.google {
        background-color: white;
        box-shadow: 0 0 0 1px ${(props) => props.theme.colors.gray2} inset;
        &:hover {
            box-shadow: 0 0 0 1px black inset;
        }
    }

    // Interaction Attribute
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.03);
        background-color: black;
        color: white;
    }
    &:active {
        transform: scale(0.97);
    }
`;

const TextWrapper = styled("div")<{ fontSize: number }>`
    // Box Model Attribute
    width: 100%;

    // Text Attribute
    font-size: ${(props) => props.fontSize}px;
    font-weight: 700;
    text-align: center;
`;

const ImageWrapper = styled("div")<{ height: string }>`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: ${(props) => parseNumber(props.height) * 0.6}px;
    height: ${(props) => parseNumber(props.height) * 0.6}px;
    max-width: 30px;
    max-height: 30px;
`;

// ----------------------------------------------------------------------------------------------------

/* Login Button Component */
function LoginButton(props: LoginButtonProps) {
    // States and Variables
    const { width, height = "50px", onClick, fontSize = 20, text, colorType } = props;
    const icon: ReactElement = colorType === "kakao" ? <KakaoIcon /> : <GoogleIcon />;

    return (
        <ButtonContainer
            width={width}
            height={height}
            onClick={onClick}
            colorType={colorType}
            className={colorType}
        >
            <ImageWrapper height={height}>{icon}</ImageWrapper>
            <TextWrapper fontSize={fontSize}>{text}</TextWrapper>
        </ButtonContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default LoginButton;
