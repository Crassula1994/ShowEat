/* Import */
import Head from "next/head";
import styled from "@emotion/styled";
import MainLayout from "@layouts/MainLayout";
import { ReactNode, useEffect, useState } from "react";
import withAuth from "@libs/withAuth";
import SearchBar from "@/components/composite/searchBar/SearchBar";
import useUserState from "@hooks/useUserState";
import { CardCarousel, AdCarousel } from "@/components/composite/carousel";
import { ScrollButton } from "@components/common/button";
import { getBookmarkFundings, getMyFundings, getMainPageList } from "@apis/fundings";
import { FundingType } from "@/customTypes/apiProps";

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
    const [myFundings, setMyFundings] = useState<FundingType[]>([]);
    const [bookmarkFundings, setBookmarkFundings] = useState<FundingType[]>([]);
    const [hotFundings, setHotFundings] = useState<FundingType[]>([]);
    const [soonFundings, setSoonFundings] = useState<FundingType[]>([]);
    const [cheapFundings, setCheapFundings] = useState<FundingType[]>([]);
    const [discountFundings, setDiscountFundings] = useState<FundingType[]>([]);

    const typesList = ["POPULARITY", "CLOSING_SOON", "LOW_PRICE", "HIGH_DISCOUNT_RATE"];

    useEffect(() => {
        const promises = typesList.map((type) => getMainPageList(type));
        if (user.userId) {
            promises.push(getMyFundings(user.userId));
            promises.push(getBookmarkFundings(user.userId));
        }
        Promise.all(promises).then((results) => {
            console.log(results);

            setHotFundings(results[0].data);
            setSoonFundings(results[1].data);
            setCheapFundings(results[2].data);
            setDiscountFundings(results[3].data);

            if (user.userId) {
                setMyFundings(results[4].data);
                setBookmarkFundings(results[5].data);
            }
        });
    }, []);

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

    const myFundingData = {
        type: "myFundings",
        title: `${user.userNickname} 님이 참여한 펀딩`,
        description: "회원님이 참여한 펀딩 중 현재 진행 중인 펀딩 목록이에요.",
        data: "",
    };
    const bookmarkFundingData = {
        type: "favorites",
        title: `${user.userNickname} 님이 조... 조... 좋아요한 펀딩`,
        description: "회원님이 ‘좋아요’ 등록한 펀딩 중 현재 진행 중인 펀딩 목록이에요.",
        data: "",
    };

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
                        {user.userId !== 0 && (
                            <>
                                <CarouselWrapper>
                                    <CardCarousel
                                        width={960}
                                        height={400}
                                        title={myFundingData.title}
                                        description={myFundingData.description}
                                        cardDatas={myFundings}
                                        setCardDatas={setMyFundings}
                                    />
                                </CarouselWrapper>
                                <CarouselWrapper>
                                    <CardCarousel
                                        width={960}
                                        height={400}
                                        title={bookmarkFundingData.title}
                                        description={bookmarkFundingData.description}
                                        cardDatas={bookmarkFundings}
                                        setCardDatas={setBookmarkFundings}
                                    />
                                </CarouselWrapper>
                            </>
                        )}

                        <CarouselWrapper>
                            <CardCarousel
                                width={960}
                                height={400}
                                title={carouselAlwaysData[0].title}
                                description={carouselAlwaysData[0].description}
                                cardDatas={hotFundings}
                                setCardDatas={setHotFundings}
                            />
                        </CarouselWrapper>
                        <CarouselWrapper>
                            <CardCarousel
                                width={960}
                                height={400}
                                title={carouselAlwaysData[1].title}
                                description={carouselAlwaysData[1].description}
                                cardDatas={soonFundings}
                                setCardDatas={setSoonFundings}
                            />
                        </CarouselWrapper>
                        <CarouselWrapper>
                            <CardCarousel
                                width={960}
                                height={400}
                                title={carouselAlwaysData[2].title}
                                description={carouselAlwaysData[2].description}
                                cardDatas={cheapFundings}
                                setCardDatas={setCheapFundings}
                            />
                        </CarouselWrapper>
                        <CarouselWrapper>
                            <CardCarousel
                                width={960}
                                height={400}
                                title={carouselAlwaysData[3].title}
                                description={carouselAlwaysData[3].description}
                                cardDatas={discountFundings}
                                setCardDatas={setDiscountFundings}
                            />
                        </CarouselWrapper>
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
