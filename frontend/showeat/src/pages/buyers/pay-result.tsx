/* Import */
import SingleLayout from "@layouts/SingleLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Buyer Pay Result Page */
function PayResult() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const approvedAt: string | null = urlParams.get("approvedAt");
    const balanceAmount: string | null = urlParams.get("balanceAmount");
    const method: string | null = urlParams.get("method");
    const orderId: string | null = urlParams.get("orderId");

    return (
        <div>
            <div>결제가 완료되었습니다.</div>
            <div>주문완료 시각: {approvedAt}</div>
            <div>결제 금액: {balanceAmount}원</div>
            <div>결제 수단: {method}</div>
            <div>주문번호: {orderId}</div>
        </div>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const PayResultWithAuth = withAuth({ WrappedComponent: PayResult, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
PayResultWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default PayResultWithAuth;
