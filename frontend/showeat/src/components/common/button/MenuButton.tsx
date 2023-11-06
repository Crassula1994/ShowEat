/* Import */
import styled from "@emotion/styled";
import Image from "next/image";
import { ButtonProps } from "@customTypes/commonProps";
import { keyframes } from "@emotion/react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface MenuButtonProps extends ButtonProps {
    imageUrl: string;
    menuName: string;
}

/* Style */
const clickAnimation = keyframes`
from {
  transform: scale(1)
}
to {
  transform: scale(1.04)
}
`;

const ImageWrapper = styled("div")<ButtonProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    min-width: 70px;
    min-height: 70px;

    position: relative;

    img {
        border-radius: 20px;
    }
`;

const TextWrapper = styled("span")`
    padding-top: 10px;

    font-size: 16px;
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    cursor: pointer;
`;

const MenuButtonContainer = styled("div")<ButtonProps>`
    width: ${(props) => props.width};

    display: flex;
    flex-direction: column;
    justify-content: "center";
    align-items: center;

    text-align: center;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
        > div > img {
            filter: brightness(0.8) saturate(1.2);
            box-shadow: 0px 0px 4px 2px ${(props) => props.theme.colors.gray4};
            cursor: pointer;
        }
        > span {
            font-weight: 700;
        }
    }
    &:active {
        > div > img {
            filter: brightness(0.6) saturate(1.5);
            box-shadow: 0px 0px 4px 2px ${(props) => props.theme.colors.gray5};
            cursor: pointer;
            animation: ${clickAnimation} 0.1s linear forwards;
        }
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Menu Button Component */
function MenuButton({ width, onClick, imageUrl, menuName }: MenuButtonProps) {
    return (
        <MenuButtonContainer width={width} onClick={onClick}>
            <ImageWrapper width={width} height={width} draggable="false">
                <Image src={imageUrl} alt="Menu Button Image" fill draggable="false" />
            </ImageWrapper>
            <TextWrapper>{menuName}</TextWrapper>
        </MenuButtonContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default MenuButton;
