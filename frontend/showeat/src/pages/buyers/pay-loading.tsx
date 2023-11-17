/* Import */
import SingleLayout from "@layouts/SingleLayout";
import withAuth from "@libs/withAuth";
import { ReactNode, useEffect } from "react";
import { getRequestPaymentApproval } from "@apis/payments";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------------------------------------

/* Buyer Pay Result Page */
function PayLoading() {
    const router = useRouter();

    useEffect(() => {
        // 성공 처리: 결제 승인 API를 호출하세요

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const paymentType: string | null = urlParams.get("paymentType");
        const orderId: string | null = urlParams.get("orderId");
        const paymentKey: string | null = urlParams.get("paymentKey");
        const amountString: string | null = urlParams.get("amount");

        if (
            paymentType !== null &&
            paymentKey !== null &&
            orderId !== null &&
            amountString !== null
        ) {
            const amount: number = parseInt(amountString, 10);

            getRequestPaymentApproval(paymentType, orderId, paymentKey, amount)
                .then((approvalResult) => {
                    const { approvedAt, balanceAmount, method } = approvalResult.data;
                    router.replace({
                        pathname: "/buyers/pay-result",
                        query: {
                            approvedAt,
                            balanceAmount,
                            method,
                            orderId,
                        },
                    });
                })
                .catch(() => {
                    router.replace("/buyers/pay");
                });
        }
    }, []);

    return <div />;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const PayResultWithAuth = withAuth({
    WrappedComponent: PayLoading,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
PayResultWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default PayResultWithAuth;
