/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Buyer Participating Fundings Page */
function MyFundings() {
    return <div>참가상 받는 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const MyFundingsWithAuth = withAuth({
    WrappedComponent: MyFundings,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
MyFundingsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default MyFundingsWithAuth;
