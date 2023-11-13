/* Import */
import { ButtonProps } from "@customTypes/commonProps";
import styled from "@emotion/styled";
import Image from "next/image";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface MenuButtonProps extends ButtonProps {
    menuName: string;
    imageUrl: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ButtonContainer = styled("div")<ButtonProps>`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // Box Model Attribute
    width: ${(props) => props.width};

    // Interaction Attribute
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    transition: 0.2s all ease-in-out;
    &:hover {
        transform: scale(1.2);
        img {
            /* filter: brightness(0.8) saturate(1.2); */
            filter: drop-shadow(1px 1px 5px ${(props) => props.theme.colors.primary3});
        }
        div {
            font-weight: 900;
            color: ${(props) => props.theme.colors.primary3};
        }
    }
    &:active {
        transform: scale(0.95);
    }
`;

const ImageWrapper = styled("div")<ButtonProps>`
    // Position Attribute
    position: relative;

    // Box Model Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    min-width: 70px;
    min-height: 70px;
    overflow: hidden;
`;

const TextWrapper = styled("div")`
    // Box Model Attribute
    margin-top: 0.5em;
    overflow: hidden;
    white-space: nowrap;

    // Text Attribute
    font-weight: 700;
    text-overflow: ellipsis;
`;

// ----------------------------------------------------------------------------------------------------

/* Menu Button Component */
function MenuButton(props: MenuButtonProps) {
    const { width, height = width, onClick, imageUrl, menuName } = props;
    return (
        <ButtonContainer width={width} onClick={onClick}>
            <ImageWrapper width={width} height={height}>
                <Image
                    src={imageUrl}
                    alt="menu-button-image"
                    fill
                    sizes="(min-width: 50em) 5vw, (min-width: 20em) 10vw, 20vw"
                />
            </ImageWrapper>
            <TextWrapper>{menuName}</TextWrapper>
        </ButtonContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default MenuButton;
