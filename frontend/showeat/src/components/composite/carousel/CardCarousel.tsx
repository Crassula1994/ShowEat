/* Import */
import Card from "@components/composite/card";
import { FundingType } from "@customTypes/apiProps";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import postBookmark from "@apis/bookmark";
import Slider from "react-slick";
import styled from "@emotion/styled";
import { useRef, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface CardCarouselProps {
    width: number;
    height: number;
    title?: string;
    description?: string;
    cardList: FundingType[];
    setCardList: Dispatch<SetStateAction<FundingType[]>>;
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

const CarouselContainer = styled("div")<Partial<CardCarouselProps>>`
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};

    padding: ${(props) => (props.title ? "1em 0" : "0")};
    margin: ${(props) => (props.title ? "4em 0" : "0")};
`;

const HeaderContainer = styled("div")`
    display: flex;
    flex-direction: column;
`;

const TitleWrapper = styled("span")`
    font-size: 26px;
    font-weight: 700;
`;

const DescriptionWrapper = styled("span")`
    font-size: 16px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.gray4};

    padding-top: 0.2em;
    padding-bottom: 2em;
`;

const CardContainer = styled("div")<Partial<CardCarouselProps>>`
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};

    position: relative;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const CardWrapper = styled("div")<Partial<CardCarouselProps>>`
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};

    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
`;

const LeftArrowWrapper = styled("div")<{ height: number }>`
    width: 50px;
    height: ${(props) => `${props.height}px`};

    position: absolute;

    border-radius: 20px 0px 0px 20px;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transform: translateX(-100%);
    opacity: 0.5;
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

const RightArrowWrapper = styled("div")<Partial<CardCarouselProps>>`
    width: 50px;
    height: ${(props) => `${props.height}px`};

    position: absolute;

    border-radius: 0px 20px 20px 0px;

    display: inline-flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transform: translateX(1920%) translateY(-100%);
    opacity: 0.5;
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

const NoDataWrapper = styled("div")<Partial<CardCarouselProps>>`
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};

    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center;

    font-size: 26px;
    font-weight: 700;
`;

// ----------------------------------------------------------------------------------------------------

/* Card Carousel Component */
function CardCarousel(props: CardCarouselProps) {
    const { width, height, title = "", description = "", cardList, setCardList } = props;
    const router = useRouter();
    const settings = {
        infinite: true,
        speed: 300,
        slidesToShow: cardList && cardList.length >= 3 ? 3 : 1,
        slidesToScroll: cardList && cardList.length >= 3 ? 3 : 1,
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

    const handleCard = (fundingId: number) => {
        router.push(`/fundings/${fundingId}`);
    };

    const handleBookmark = (fundingId: number) => {
        postBookmark(fundingId.toString()).then((res) => {
            if (res.statusCode === 200) {
                const updatedCardList = cardList.map((cardData) => {
                    if (cardData.fundingId === fundingId) {
                        return { ...cardData, fundingIsBookmark: !cardData.fundingIsBookmark };
                    }
                    return cardData;
                });

                setCardList(updatedCardList);
            }
        });
    };

    return (
        <CarouselContainer width={width} height={height} title={title}>
            {title && (
                <HeaderContainer>
                    <TitleWrapper>{title}</TitleWrapper>
                    <DescriptionWrapper>{description}</DescriptionWrapper>
                </HeaderContainer>
            )}
            <CardContainer width={width} height={height}>
                <LeftArrowWrapper height={height} onClick={goToPrev}>
                    <Image
                        src="/assets/icons/left-arrow-icon.svg"
                        alt="carousel-left-arrow"
                        width={40}
                        height={40}
                    />
                </LeftArrowWrapper>
                <Slider {...settings} ref={sliderRef}>
                    {cardList && cardList.length > 0 ? (
                        cardList.map((cardData, index) => (
                            <CardWrapper key={index} width={width} height={height}>
                                <Card
                                    fundingData={cardData}
                                    onFundingClick={() => handleCard(cardData.fundingId)}
                                    onBookmark={() => {
                                        handleBookmark(cardData.fundingId);
                                    }}
                                    inCarousel
                                />
                            </CardWrapper>
                        ))
                    ) : (
                        <NoDataWrapper width={width} height={height}>
                            데이터가 없습니다.
                        </NoDataWrapper>
                    )}
                </Slider>
                <RightArrowWrapper height={height} onClick={goToNext} cardList={cardList}>
                    <Image
                        src="/assets/icons/right-arrow-icon.svg"
                        alt="carousel-right-arrow"
                        width={40}
                        height={40}
                    />
                </RightArrowWrapper>
            </CardContainer>
        </CarouselContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default CardCarousel;
