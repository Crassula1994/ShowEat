/* Import */
import Card from "@components/composite/card";
import { FundingType } from "@customTypes/apiProps";
import { getSellerActiveFunding } from "@apis/fundings";
import Head from "next/head";
import { ReactNode, useEffect, useState } from "react";
import SellerLayout from "@layouts/SellerLayout";
import styled from "@emotion/styled";
import { TextButton, ScrollButton } from "@components/common/button";
import { useRouter } from "next/router";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Style */
const FavoritesContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // Box Model Attribute
    width: 100%;
    min-width: 478px;
    box-sizing: border-box;
    padding: 5% 15%;
`;

const TitleWrapper = styled("span")`
    // Text Attribute
    font-size: 30px;
    font-weight: 900;

    // Box Model Attribute
    width: 100%;
    margin-bottom: 2em;
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

/* Seller On Boarding Fundings Page */
function OnBoardingFunding() {
    const router = useRouter();
    const [fundingData, setFundingData] = useState<FundingType[]>([]);
    const [page, setPage] = useState(0);
    const [hasMorePage, setHasMorePage] = useState<boolean>(false);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const handleCard = (fundingId: number) => {
        router.push(`/fundings/${fundingId}/store`);
    };

    const fetchFundingData = () => {
        getSellerActiveFunding(page).then((data) => {
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
        });
    };

    useEffect(() => {
        fetchFundingData();
    }, [page]);

    return (
        <>
            <Head>
                <title>진행 중 펀딩</title>
                <meta name="description" content="셀러 님께서 진행 중이신 펀딩 목록입니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <FavoritesContainer>
                <TitleWrapper>진행 중 펀딩</TitleWrapper>
                {fundingData.length === 0 ? (
                    <NoDataWrapper>진행 중인 펀딩이 없습니다.</NoDataWrapper>
                ) : (
                    <CardsContainer>
                        {fundingData.map((funding, index) => (
                            <Card
                                key={index}
                                fundingData={funding}
                                onFundingClick={() => handleCard(funding.fundingId)}
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
const OnBoardingFundingWithAuth = withAuth({
    WrappedComponent: OnBoardingFunding,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
OnBoardingFundingWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default OnBoardingFundingWithAuth;
