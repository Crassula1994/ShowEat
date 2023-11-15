/* Import */
import Head from "next/head";
import styled from "@emotion/styled";
import MainLayout from "@layouts/MainLayout";
import { ReactNode, useEffect, useState } from "react";
import withAuth from "@libs/withAuth";
import SearchBar from "@components/composite/searchBar";
import useUserState from "@hooks/useUserState";
import { CardCarousel, AdCarousel } from "@components/composite/carousel";
import { ScrollButton } from "@components/common/button";
import { getUserFundings, getFavoriteFundings, getMainPageList } from "@apis/fundings";
import { FundingType } from "@customTypes/apiProps";
import { adData, carouselAlwaysData } from "@configs/carouselList";
import { GetServerSideProps } from "next";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface HomeProps {
    fundingListData: FundingType[][];
}

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

// ----------------------------------------------------------------------------------------------------

/* Server Side Rendering */
export const getServerSideProps: GetServerSideProps = async () => {
    // States and Variables
    const typesList = ["POPULARITY", "CLOSING_SOON", "LOW_PRICE", "HIGH_DISCOUNT_RATE"];
    const promises = typesList.map((type) => getMainPageList(type));

    const results = await Promise.all(promises);
    const fundingListData: FundingType[][] = results.map((result) => result.data) || [[]];

    return {
        props: {
            fundingListData,
        },
    };
};

// ----------------------------------------------------------------------------------------------------

/* Home Component */
function Home(props: HomeProps) {
    const { fundingListData } = props;
    const [user] = useUserState();
    const [myFundings, setMyFundings] = useState<FundingType[]>([]);
    const [bookmarkFundings, setBookmarkFundings] = useState<FundingType[]>([]);
    const [hotFundings, setHotFundings] = useState<FundingType[]>(fundingListData[0]);
    const [soonFundings, setSoonFundings] = useState<FundingType[]>(fundingListData[1]);
    const [cheapFundings, setCheapFundings] = useState<FundingType[]>(fundingListData[2]);
    const [discountFundings, setDiscountFundings] = useState<FundingType[]>(fundingListData[3]);

    useEffect(() => {
        if (user && user.userId !== 0) {
            const promises = [getUserFundings(0), getFavoriteFundings(0)];
            Promise.all(promises).then((results) => {
                if (results[0].data) {
                    setMyFundings(results[0].data.content);
                }
                if (results[1].data) {
                    setBookmarkFundings(results[1].data.content);
                }
            });
        }
    }, [user]);

    const myFundingData = {
        type: "myFundings",
        title: `${user.userNickname} 님이 참여한 펀딩`,
        description: "회원님이 참여한 펀딩 중 현재 진행 중인 펀딩 목록이에요.",
    };
    const bookmarkFundingData = {
        type: "favorites",
        title: `${user.userNickname} 님이 조... 조... 좋아요한 펀딩`,
        description: "회원님이 ‘좋아요’ 등록한 펀딩 중 현재 진행 중인 펀딩 목록이에요.",
    };

    return (
        <>
            <Head>
                <title>쑈잇: ShowEat</title>
                <meta
                    name="description"
                    content="'소비자와 소상공인을 잇다.' 소상공인 펀딩 플랫폼 쑈잇입니다."
                />
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
                                        cardList={myFundings}
                                        setCardList={setMyFundings}
                                    />
                                </CarouselWrapper>
                                <CarouselWrapper>
                                    <CardCarousel
                                        width={960}
                                        height={400}
                                        title={bookmarkFundingData.title}
                                        description={bookmarkFundingData.description}
                                        cardList={bookmarkFundings}
                                        setCardList={setBookmarkFundings}
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
                                cardList={hotFundings}
                                setCardList={setHotFundings}
                            />
                        </CarouselWrapper>
                        <CarouselWrapper>
                            <CardCarousel
                                width={960}
                                height={400}
                                title={carouselAlwaysData[1].title}
                                description={carouselAlwaysData[1].description}
                                cardList={soonFundings}
                                setCardList={setSoonFundings}
                            />
                        </CarouselWrapper>
                        <CarouselWrapper>
                            <CardCarousel
                                width={960}
                                height={400}
                                title={carouselAlwaysData[2].title}
                                description={carouselAlwaysData[2].description}
                                cardList={cheapFundings}
                                setCardList={setCheapFundings}
                            />
                        </CarouselWrapper>
                        <CarouselWrapper>
                            <CardCarousel
                                width={960}
                                height={400}
                                title={carouselAlwaysData[3].title}
                                description={carouselAlwaysData[3].description}
                                cardList={discountFundings}
                                setCardList={setDiscountFundings}
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
