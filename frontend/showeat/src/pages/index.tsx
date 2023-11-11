/* Import */
import Head from "next/head";
import styled from "@emotion/styled";
import MainLayout from "@layouts/MainLayout";
import {
    ReactNode,
    //  useEffect, useState
} from "react";
import withAuth from "@libs/withAuth";
import SearchBar from "@/components/composite/searchBar/SearchBar";
import useUserState from "@hooks/useUserState";
import { CardCarousel, AdCarousel } from "@/components/composite/carousel";
import { ScrollButton } from "@components/common/button";
// import { getBookmarkFundings, getMyFundings, getMainPageList } from "@/apis/fundings";

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

/* Type */
// interface FundingDatasType {
//     fundingDatas: {
//         fundingId: number;
//         title: string;
//         businessName: string;
//         category: string;
//         maxLimit: number;
//         minLimit: number;
//         curCount: number;
//         menu: string;
//         price: number;
//         discountPrice: number;
//         discountRate: number;
//         startDate: string;
//         endDate: string;
//         fundingIsActive: string;
//         fundingIsSuccess: string;
//         fundingImageResponseDtos: {
//             imageId: number;
//             imageUrl: string;
//         }[];
//         fundingIsBookmark: boolean;
//     }[];
// }

// ----------------------------------------------------------------------------------------------------

/* Style */
const AdvertiseContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 1080px;
    height: 400px;

    margin-bottom: 2em;
`;

const MainContentsContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;

    min-width: 1080px;

    padding-top: 2em;
`;

const RecommendContentsContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

const CarouselWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

/* Home Component */
function Home() {
    const [user] = useUserState();
    // const [myFundings, setMyFundings] = useState<FundingDatasType[]>([]);
    // const [bookmarkFundings, setBookmarkFundings] = useState([]);
    // const [mainFundings, setMainFundings] = useState([]);

    // const typesList = ["POPULARITY", "CLOSING_SOON", "LOW_PRICE", "HIGH_DISCOUNT_RATE"];

    // 이 쪽 API와 연결하면서 수정해야됨.
    // useEffect(() => {
    //     const promises = typesList.map((type) => getMainPageList({ type }));
    //     if (user.userId) {
    //         promises.push(getMyFundings(user.userId));
    //         promises.push(getBookmarkFundings(user.userId));
    //     }
    //     Promise.all(promises)
    //         .then((results) => {
    //             // 여기서 results 배열에는 모든 Promise의 결과가 저장됩니다.
    //             setMainFundings(results.slice(0, typesList.length));
    //             setMyFundings(results[results.length - 2]);
    //             setBookmarkFundings(results[results.length - 1]);

    //             // 결과를 처리합니다.
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    const adData = [
        {
            businessName: "야옹",
            imgUrl: "/assets/images/ad/cat.png",
        },
        {
            businessName: "댕댕",
            imgUrl: "/assets/images/ad/dog.jpeg",
        },
        {
            businessName: "라쿤",
            imgUrl: "/assets/images/ad/raccoon.jpg",
        },
        {
            businessName: "레서판다",
            imgUrl: "/assets/images/ad/lesserpanda.jpg",
        },
    ];

    const carouselLoginnedData = [
        {
            type: "myFundings",
            title: `${user.userNickname} 님이 참여한 펀딩`,
            description: "회원님이 참여한 펀딩 중 현재 진행 중인 펀딩 목록이에요.",
            data: "",
        },
        {
            type: "favorites",
            title: `${user.userNickname} 님이 조... 조... 좋아요한 펀딩`,
            description: "회원님이 ‘좋아요’ 등록한 펀딩 중 현재 진행 중인 펀딩 목록이에요.",
            data: "",
        },
    ];

    const carouselAlwaysData = [
        {
            type: "POPULARITY",
            title: "무수히 많은 펀딩의 요청이! 실시간 HOT 펀딩",
            description:
                "셀러가 설정한 최소 참여 인원을 초과 달성하고 있는 실시간 인기 펀딩 목록이에요.",
            data: "",
        },
        {
            type: "CLOSING_SOON",
            title: "너만 오면 Go, 마감 임박!",
            description:
                "셀러가 설정한 최소 참여 인원을 달성한 펀딩 중 최대 참여 인원에 근접했거나, 마감 시한에 가까운 펀딩 목록이에요.",
            data: "",
        },
        {
            type: "LOW_PRICE",
            title: "앗! 타이어보다 싸다, 파격 세일!",
            description: "셀러가 가격을 대폭 낮춘 할인율이 높은 펀딩 목록이에요.",
            data: "",
        },
        {
            type: "HIGH_DISCOUNT_RATE",
            title: "안 먹어 본 사람은 있어도 한 번만 먹은 사람은 없다!",
            description: "바이어의 재구매율이 높은 셀러의 펀딩 목록이에요.",
            data: "",
        },
    ];

    return (
        <>
            <Head>
                <title>쑈잇: ShowEat</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <AdvertiseContainer>
                    <AdCarousel height={400} adData={adData} />
                </AdvertiseContainer>
                <MainContentsContainer>
                    <SearchBar />
                    <RecommendContentsContainer>
                        {user.userId !== 0 &&
                            carouselLoginnedData.map((carouselData, idx) => (
                                <CarouselWrapper key={`${carouselData.type}-${idx}`}>
                                    <CardCarousel
                                        width={960}
                                        height={400}
                                        title={carouselData.title}
                                        description={carouselData.description}
                                        cardDatas={fundingDatas}
                                    />
                                </CarouselWrapper>
                            ))}
                        {carouselAlwaysData.map((carouselData, idx) => (
                            <CarouselWrapper key={`${carouselData.type}-${idx}`}>
                                <CardCarousel
                                    width={960}
                                    height={400}
                                    title={carouselData.title}
                                    description={carouselData.description}
                                    cardDatas={fundingDatas}
                                />
                            </CarouselWrapper>
                        ))}
                    </RecommendContentsContainer>
                </MainContentsContainer>
                <ScrollButton width="40px" />
            </main>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const SignInWithAuth = withAuth({ WrappedComponent: Home });

// ----------------------------------------------------------------------------------------------------

/* Layout */
SignInWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SignInWithAuth;
