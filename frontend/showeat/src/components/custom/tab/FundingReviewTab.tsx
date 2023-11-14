/* Import */
import getReviewList from "@apis/review";
import PaginationBar from "@components/composite/paginationBar";
import ReviewBox from "@components/composite/reviewBox";
import styled from "@emotion/styled";
import { ReviewType } from "@customTypes/apiProps";
import { useState } from "react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface FundingReviewTabProps {
    businessId: number;
    reviewList: ReviewType[];
    reviewPage: number;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ReviewContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5em;

    // Box Model Attribute
    width: 100%;
`;

const ReviewListWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3em;

    // Box Model Attribute
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Funding Review Tab Component */
function FundingReviewTab(props: FundingReviewTabProps) {
    // States and Variables
    const { businessId, reviewList, reviewPage } = props;
    const [curPage, setCurPage] = useState<number>(1);
    const [curReviewList, setCurReviewList] = useState<ReviewType[]>(reviewList);

    const handlePageClick = (number: number) => {
        setCurPage(number);
        getReviewList(businessId, number - 1).then((result) => {
            setCurReviewList(result.data.reviewResponseDtos);
        });
    };

    return (
        <ReviewContainer>
            <ReviewListWrapper>
                {curReviewList.map((reviewData, index) => (
                    <ReviewBox key={index} reviewData={reviewData} />
                ))}
            </ReviewListWrapper>
            <PaginationBar
                pageCount={reviewPage}
                selectedPage={curPage}
                setSelectedPage={setCurPage}
                onClick={handlePageClick}
            />
        </ReviewContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingReviewTab;
