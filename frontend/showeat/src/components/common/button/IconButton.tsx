/* Import */
import { ButtonProps } from "@customTypes/commonProps";
import Image from "next/image";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface IconButtonProps extends ButtonProps {
    source: string;
    alternative: string;
    id?: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ButtonContainer = styled("div")<{ width: number; height: number }>`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;

    // Interaction Attribute
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    transition: all 0.3s ease;
    &:hover {
        img {
            transform: scale(1.1);
        }
    }
    &:active {
        img {
            transform: scale(0.9);
        }
    }
`;

const ImageWrapper = styled("div")`
    // Position Attribute
    position: relative;

    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    max-width: 50px;
    max-height: 50px;
`;

// ----------------------------------------------------------------------------------------------------

/* Icon Button Component */
function IconButton(props: IconButtonProps) {
    // States and Variables
    const { width, height = Number(width), onClick, source, alternative, id } = props;

    return (
        <ButtonContainer
            id={id}
            width={Number(width) * 1.2}
            height={Number(height) * 1.2}
            onClick={onClick}
        >
            <ImageWrapper>
                <Image
                    src={source}
                    width={Number(width)}
                    height={Number(height)}
                    alt={alternative}
                    priority
                />
            </ImageWrapper>
        </ButtonContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default IconButton;
