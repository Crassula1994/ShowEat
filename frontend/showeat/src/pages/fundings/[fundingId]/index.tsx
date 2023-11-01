/* Import */
import FundingLayout from "@layouts/FundingLayout";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Funding Page */
function Funding() {
    return <div>펀딩 메인 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
Funding.getLayout = function getLayout(page: ReactNode) {
    return <FundingLayout>{page}</FundingLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Funding;
