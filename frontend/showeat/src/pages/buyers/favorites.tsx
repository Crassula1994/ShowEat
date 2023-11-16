/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import Card from "@components/composite/card";
import { FundingType } from "@customTypes/apiProps";
import { getFavoriteFundings } from "@apis/fundings";
import Head from "next/head";
import Image from "next/image";
import styled from "@emotion/styled";
import { TextButton, ScrollButton } from "@components/common/button";
import postBookmark from "@apis/bookmark";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useUserState from "@hooks/useUserState";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Style */
const FavoritesContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5em;

    // Box Model Attribute
    width: 100%;
    min-width: 750px;
    box-sizing: border-box;
    padding: 5em 10em;
`;

const TitleWrapper = styled("div")`
    // Text Attribute
    font-size: 30px;
    font-weight: 900;
`;

const BlankWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2em;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const TextWrapper = styled("div")`
    // Text Attribute
    font-weight: 700;
    font-size: 30px;
    color: ${(props) => props.theme.colors.gray4};
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
    const router = useRouter();
    const [user] = useUserState();
    const [fundingData, setFundingData] = useState<FundingType[]>([]);
    const [page, setPage] = useState<number>(0);
    const [hasMorePage, setHasMorePage] = useState<boolean>(false);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const handleCard = (fundingId: number) => {
        router.push(`/fundings/${fundingId}/store`);
    };

    const handleBookmark = (funding: FundingType) => {
        postBookmark(funding.fundingId.toString()).then((res) => {
            if (res.statusCode === 200) {
                setFundingData(
                    fundingData.map((item) =>
                        item.fundingId === funding.fundingId
                            ? { ...item, fundingIsBookmark: !item.fundingIsBookmark }
                            : item,
                    ),
                );
            }
        });
    };

    const fetchFundingData = () => {
        getFavoriteFundings(page).then((data) => {
            if (data.statusCode === 200) {
                if (data.data && data.data.content && data.data.content.length > 0) {
                    const isLastPage: boolean = data.data.last;
                    const fundingList: FundingType[] = data.data.content || [];
                    if (page === 0) {
                        setFundingData(fundingList);
                        setHasMorePage(!isLastPage);
                    } else {
                        setFundingData([...fundingData, ...fundingList]);
                        setHasMorePage(!isLastPage);
                    }
                }
            } else {
                setHasMorePage(false);
            }
        });
    };

    useEffect(() => {
        const { userId } = user;
        if (userId !== 0) {
            fetchFundingData();
        }
        fetchFundingData();
    }, [user, page]);

    return (
        <>
            <Head>
                <title>내가 관심 등록한 펀딩</title>
                <meta name="description" content="바이어 님께서 관심 등록하신 펀딩 목록입니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <FavoritesContainer>
                <TitleWrapper>관심 펀딩 목록</TitleWrapper>
                {fundingData.length === 0 ? (
                    <BlankWrapper>
                        <Image
                            src="/assets/images/crying-cook-cow.png"
                            width={150}
                            height={150}
                            alt="crying-cook-cow"
                            priority
                        />
                        <TextWrapper>관심 등록한 펀딩이 존재하지 않소!</TextWrapper>
                    </BlankWrapper>
                ) : (
                    <CardsContainer>
                        {fundingData.map((funding, index) => (
                            <Card
                                key={index}
                                fundingData={funding}
                                onFundingClick={() => handleCard(funding.fundingId)}
                                onBookmark={() => handleBookmark(funding)}
                                inMyPage
                            />
                        ))}
                    </CardsContainer>
                )}
                {hasMorePage ? (
                    <MoreButtonWrapper>
                        <TextButton
                            text="더 보기"
                            width="400px"
                            height="50px"
                            colorType="secondary"
                            curve="round"
                            fontSize={20}
                            onClick={() => handleLoadMore()}
                        />
                    </MoreButtonWrapper>
                ) : null}
                <ScrollButton width="40px" height="40px" />
            </FavoritesContainer>
        </>
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
