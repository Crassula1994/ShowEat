/* Import */
import MainLayout from "@/layouts/MainLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Seller Redeem Result Page */
function RedeemResult() {
    return <div>쿠폰 결과</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const RedeemResultWithAuth = withAuth({
    WrappedComponent: RedeemResult,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
RedeemResultWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default RedeemResultWithAuth;
