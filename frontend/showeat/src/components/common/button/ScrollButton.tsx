/* Import */
import { ButtonProps } from "@customTypes/commonProps";
import Image from "next/image";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------------------------------------

/* Style */
const ButtonContainer = styled("div")`
    // Position Attribute
    position: fixed;
    right: 5%;
    bottom: 5%;
    z-index: 1;

    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5vh;

    // Box Model Attribute
    margin: 1%;

    // Style Attribute
    img {
        filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.5));
    }

    // Interaction Attribute
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    transition: all 0.3s ease;
    &:hover {
        transform: scale(1.1);
        img {
            filter: drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.25));
        }
    }
`;

const ImageWrapper = styled("div")`
    // Position Attribute
    position: relative;

    // Box Model Attribute
    max-width: 50px;
    max-height: 50px;
`;

const TextWrapper = styled("div")`
    // Text Attribute
    font-weight: 700;
    color: ${(props) => props.theme.colors.secondary3};
    text-shadow:
        1px 0px 3px rgba(0, 0, 0, 0.1),
        -1px 0px 3px rgba(0, 0, 0, 0.1),
        0px 0px 3px rgba(0, 0, 0, 0.1);
`;

// ----------------------------------------------------------------------------------------------------

/* Scroll Button Component */
function ScrollButton(props: ButtonProps) {
    // States and Variables
    const { width, height = "auto" } = props;
    const buttonStyle = {
        width,
        height,
    };
    const [isVisible, setIsVisible] = useState<boolean>(false);

    // Functions
    const scrollToTop = () => {
        if (isVisible)
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
    };

    // Hooks
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) setIsVisible(true);
            else setIsVisible(false);
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        isVisible && (
            <ButtonContainer onClick={scrollToTop}>
                <ImageWrapper>
                    <Image
                        src="/assets/icons/scroll-to-up-icon.svg"
                        width={50}
                        height={50}
                        alt="scroll-to-up"
                        style={buttonStyle}
                    />
                </ImageWrapper>
                <TextWrapper>맨 위로</TextWrapper>
            </ButtonContainer>
        )
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ScrollButton;
