/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import Card from "@components/composite/card";
import withAuth from "@libs/withAuth";
import { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { TextButton, ScrollButton } from "@components/common/button";
import { getFavoriteFundings } from "@apis/fundings";
import postBookmark from "@apis/bookmark";
import { FundingType } from "@customTypes/apiProps";
import { useRouter } from "next/router";
import Head from "next/head";
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

const NoDataWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
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
    const [fundingData, setFundingData] = useState<FundingType[]>([]);
    const [page, setPage] = useState(0);
    const [hasMorePage, setHasMorePage] = useState<boolean>(false);

    const handleLoadMore = () => {
        setPage(page + 1); // 더보기 : 페이지 + 1
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
                setFundingData([]);
                setHasMorePage(false);
            }
        });
    };

    useEffect(() => {
        fetchFundingData();
    }, [page]);

    return (
        <>
            <Head>
                <title>내가 좋아요한 펀딩</title>
                <meta name="description" content="바이어님께서 좋아요하신 펀딩 목록입니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <FavoritesContainer>
                <TitleWrapper>관심 펀딩 목록</TitleWrapper>
                {fundingData.length === 0 ? (
                    <NoDataWrapper>관심있는 펀딩이 없습니다.</NoDataWrapper>
                ) : (
                    <CardsContainer>
                        {fundingData.map((funding, index) => (
                            <Card
                                key={index}
                                fundingData={funding}
                                onFundingClick={() => handleCard(funding.fundingId)}
                                onBookmark={() => handleBookmark(funding)}
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
