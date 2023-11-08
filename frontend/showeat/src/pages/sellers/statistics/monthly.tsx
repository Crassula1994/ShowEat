/* Import */
import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Monthly Statistics Page */
function MonthlyStats() {
    return <div>월별 매출</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const MonthlyStatsWithAuth = withAuth({
    WrappedComponent: MonthlyStats,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
MonthlyStatsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default MonthlyStatsWithAuth;
