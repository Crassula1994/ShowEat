/* Import */
import MainLayout from "@/layouts/MainLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Seller Reading Redeem Page */
function Redeem() {
    return <div>쿠폰 읽기</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const RedeemWithAuth = withAuth({
    WrappedComponent: Redeem,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
RedeemWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default RedeemWithAuth;
