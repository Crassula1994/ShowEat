/* Import */
import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Seller Closed Fundings Page */
function ClosedFunding() {
    return <div>종료된 펀딩</div>;
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
