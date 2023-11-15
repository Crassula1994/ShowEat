/* Import */
import styled from "@emotion/styled";
import Image from "next/image";
import Slider from "react-slick";
import { keyframes } from "@emotion/react";
import { useRef } from "react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface CarouselProps {
    height: number;
    adData: {
        businessName: string;
        imgUrl: string;
    }[];
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const hoverAnimation = keyframes`
from {
  transform: scale(1)
}
to {
  transform: scale(1.1)
}
`;

const clickAnimation = keyframes`
from {
  transform: scale(1.1)
}
to {
  transform: scale(1.2)
}
`;

const CarouselContainer = styled("div")<Partial<CarouselProps>>`
    width: 100%;
    height: ${(props) => `${props.height}px`};

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    box-sizing: border-box;
    outline: none;
`;

const CarouselAdWrapper = styled("div")<Partial<CarouselProps>>`
    width: 100%;
    height: ${(props) => `${props.height}px`};

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    outline: none;
`;

const CarouselAdBox = styled(Image)`
    object-fit: cover;
    outline: none;
`;

const LeftArrowWrapper = styled("div")<{ height: number }>`
    width: 50px;
    height: ${(props) => `${props.height}px`};

    position: absolute;
    left: 0;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    outline: none;
    opacity: 0.2;
    z-index: 100;

    &:hover {
        background: rgba(0, 0, 0, 0.2); // 반투명한 회색 창
        opacity: 1;

        & img {
            animation: ${hoverAnimation} 0.2s linear forwards;
        }
    }

    &:active {
        background: rgba(0, 0, 0, 0.4); // 반투명한 회색 창
        opacity: 1;

        & img {
            animation: ${clickAnimation} 0.1s linear forwards;
        }
    }
`;

const RightArrowWrapper = styled("div")<{ height: number }>`
    width: 50px;
    height: ${(props) => `${props.height}px`};

    position: absolute;
    right: 0;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transform: translateY(-101%);
    outline: none;
    opacity: 0.2;
    z-index: 100;

    &:hover {
        background: rgba(0, 0, 0, 0.2); // 반투명한 회색 창
        opacity: 1;

        & img {
            animation: ${hoverAnimation} 0.2s linear forwards;
        }
    }

    &:active {
        background: rgba(0, 0, 0, 0.4); // 반투명한 회색 창
        opacity: 1;

        & img {
            animation: ${clickAnimation} 0.1s linear forwards;
        }
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Ad Carousel Component */
function AdCarousel({ height, adData }: CarouselProps) {
    const settings = {
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
    };

    const sliderRef = useRef<Slider | null>(null);

    const goToPrev = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const goToNext = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    return (
        <CarouselContainer height={height}>
            <LeftArrowWrapper height={height} onClick={goToPrev}>
                <Image
                    src="/assets/icons/left-arrow-icon.svg"
                    alt="carousel-left-arrow"
                    width={40}
                    height={40}
                />
            </LeftArrowWrapper>
            <Slider {...settings} ref={sliderRef}>
                {adData.map((content, idx) => (
                    <CarouselAdWrapper key={`${content}-${idx}`} height={height}>
                        <CarouselAdBox fill src={content.imgUrl} alt="advertise" />
                    </CarouselAdWrapper>
                ))}
            </Slider>
            <RightArrowWrapper height={height} onClick={goToNext}>
                <Image
                    src="/assets/icons/right-arrow-icon.svg"
                    alt="carousel-right-arrow"
                    width={40}
                    height={40}
                />
            </RightArrowWrapper>
        </CarouselContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default AdCarousel;
