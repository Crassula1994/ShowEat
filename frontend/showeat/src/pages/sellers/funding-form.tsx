/* Import */
import MainLayout from "@/layouts/MainLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Seller Funding Form Page */
function FundingForm() {
    return <div>펀딩 생성</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const FundingFormWithAuth = withAuth({
    WrappedComponent: FundingForm,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
FundingFormWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingFormWithAuth;
