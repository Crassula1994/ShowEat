/* Import */
import FundingLayout from "@layouts/FundingLayout";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Funding Store Page */
function Store() {
    return <div>상점 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
Store.getLayout = function getLayout(page: ReactNode) {
    return <FundingLayout>{page}</FundingLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Store;
