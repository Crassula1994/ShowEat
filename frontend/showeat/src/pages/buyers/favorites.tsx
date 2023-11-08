/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import Card from "@components/composite/card";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";
import styled from "@emotion/styled";
import { TextButton, ScrollButton } from "@components/common/button";

// ----------------------------------------------------------------------------------------------------

/* Temporary Data */
const fundingDatas = [
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
];

// ----------------------------------------------------------------------------------------------------

/* Style */
const FavoritesContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 478px;
    height: 100%;

    padding-bottom: 2em;
    margin: 0;
`;

const TitleWrapper = styled("span")`
    font-size: 40px;
    font-weight: 700;

    padding: 1em;
`;

const CardsContainer = styled("div")`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5em;

    @media (max-width: 1260px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 3em;
    }

    @media (max-width: 830px) {
        grid-template-columns: repeat(1, 1fr);
        gap: 2em;
    }
`;

const MoreButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding-top: 3em;
`;

// ----------------------------------------------------------------------------------------------------

/* Buyer Favorites Page */
function Favorites() {
    const handleCard = () => {
        console.log("꾹");
    };

    const handleBookmark = () => {
        console.log("하트");
    };

    return (
        <FavoritesContainer>
            <TitleWrapper>관심 펀딩 목록</TitleWrapper>
            <CardsContainer>
                {fundingDatas.map((data, idx) => (
                    <Card
                        key={`${data.title}-${idx}`}
                        fundingData={data}
                        onFundingClick={handleCard}
                        onBookmark={handleBookmark}
                    />
                ))}
            </CardsContainer>
            <MoreButtonWrapper>
                <TextButton
                    text="더 보기"
                    width="400px"
                    height="50px"
                    colorType="secondary"
                    curve="round"
                    fontSize={20}
                />
            </MoreButtonWrapper>
            <ScrollButton width="40px" height="40px" />
        </FavoritesContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const FavoritesWithAuth = withAuth({
    WrappedComponent: Favorites,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
FavoritesWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FavoritesWithAuth;
