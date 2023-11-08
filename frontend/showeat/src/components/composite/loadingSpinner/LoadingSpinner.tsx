/* Import */
import Image from "next/image";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Style */
// Animation
const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-50px);
    }
    60% {
        transform: translateY(20px);
    }
`;

const SpinnerContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5em;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const ImageWrapper = styled("div")`
    // Interaction Attribute
    animation: ${bounce} 1s ease-in-out infinite;
    animation-delay: 0.5s;
`;

const LoaderContainer = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: center;
    align-items: center;
`;

const DotWrapper = styled("div")<{ index: number }>`
    // Box Model Attribute
    width: 20px;
    height: 20px;
    margin: 0 0.5em;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.cow};
    border-radius: 50%;

    // Interaction Attribute
    animation: ${bounce} 1s ease-out infinite;
    &:nth-of-type(${(props) => props.index + 1}) {
        animation-delay: ${(props) => 0.1 * props.index}s;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Loading Spinner Component */
function LoadingSpinner() {
    return (
        <SpinnerContainer>
            <ImageWrapper>
                <Image
                    src="/assets/images/cook-cow.png"
                    width={150}
                    height={150}
                    alt="cook-cow"
                    priority
                />
            </ImageWrapper>
            <LoaderContainer>
                <DotWrapper index={0} />
                <DotWrapper index={1} />
                <DotWrapper index={2} />
                <DotWrapper index={3} />
                <DotWrapper index={4} />
            </LoaderContainer>
        </SpinnerContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default LoadingSpinner;
