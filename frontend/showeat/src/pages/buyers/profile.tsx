/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Buyer Profile Page */
function BuyerProfile() {
    return <div>회원 정보 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const BuyerProfileWithAuth = withAuth({
    WrappedComponent: BuyerProfile,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
BuyerProfileWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default BuyerProfileWithAuth;
