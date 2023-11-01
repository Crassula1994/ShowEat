/* Import */
import FundingLayout from "@layouts/FundingLayout";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Funding Review Page */
function Review() {
    return <div>리뷰 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
Review.getLayout = function getLayout(page: ReactNode) {
    return <FundingLayout>{page}</FundingLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Review;
