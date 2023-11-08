/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Buyer Pay Result Page */
function PayResult() {
    return <div>결제 결과 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const PayResultWithAuth = withAuth({
    WrappedComponent: PayResult,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
PayResultWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default PayResultWithAuth;
