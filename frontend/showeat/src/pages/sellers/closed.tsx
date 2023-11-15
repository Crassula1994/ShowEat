/* Import */
import { ReactNode, useEffect, useState } from "react";
import { TextButton, ScrollButton } from "@components/common/button";
import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import styled from "@emotion/styled";
import Card from "@components/composite/card";
import { getSellerInactiveFunding } from "@apis/fundings";
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

/* Seller On Boarding Fundings Page */
function ClosedFunding() {
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

    const fetchFundingData = () => {
        getSellerInactiveFunding(page).then((data) => {
            if (data.data.content && data.data.content.length > 0) {
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
                <title>종료된 펀딩</title>
                <meta
                    name="description"
                    content="셀러님께서 과거에 진행한 이미 종료된 펀딩 목록입니다."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <FavoritesContainer>
                <TitleWrapper>종료된 목록</TitleWrapper>
                {fundingData.length === 0 ? (
                    <NoDataWrapper>종료된 펀딩이 없습니다.</NoDataWrapper>
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
const ClosedFundingWithAuth = withAuth({
    WrappedComponent: ClosedFunding,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
ClosedFundingWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ClosedFundingWithAuth;
