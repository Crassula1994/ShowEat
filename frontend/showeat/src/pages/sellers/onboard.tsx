/* Import */
import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Seller On Boarding Fundings Page */
function OnBoardingFunding() {
    return <div>진행중 펀딩</div>;
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
