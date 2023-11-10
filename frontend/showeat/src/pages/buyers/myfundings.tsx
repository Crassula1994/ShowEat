/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import Card from "@components/composite/card";
import withAuth from "@libs/withAuth";
import { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { TextButton, ScrollButton } from "@components/common/button";
import { getUserFundings, postHeart } from "@/apis/fundings";
import { FundingType } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Style */
const MyFundingsContainer = styled("div")`
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

/* Buyer Participating Fundings Page */
function MyFundings() {
    const [fundingData, setFundingData] = useState<FundingType[]>([]);
    const [page, setPage] = useState(0);
    const [hasMorePage, setHasMorePage] = useState<boolean>(false);

    const handleLoadMore = () => {
        setPage(page + 1); // 더보기 : 페이지 + 1
    };
    const handleCard = () => {
        console.log("꾹");
    };

    const handleBookmark = (funding: FundingType) => {
        postHeart(funding.fundingId).then((res) => {
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
        getUserFundings(page).then((data) => {
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
        <MyFundingsContainer>
            <TitleWrapper>참여 펀딩 목록</TitleWrapper>
            {fundingData.length === 0 ? (
                <CardsContainer>진행중인 펀딩이 없습니다.</CardsContainer>
            ) : (
                <CardsContainer>
                    {fundingData.map((funding, index) => (
                        <Card
                            key={index}
                            fundingData={funding}
                            onFundingClick={handleCard}
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
        </MyFundingsContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const MyFundingsWithAuth = withAuth({
    WrappedComponent: MyFundings,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
MyFundingsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default MyFundingsWithAuth;
