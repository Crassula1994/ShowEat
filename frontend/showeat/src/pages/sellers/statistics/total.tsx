/* Import */
import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Total Statistics Page */
function TotalStats() {
    return <div>종합 매출</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const TotalStatsWithAuth = withAuth({
    WrappedComponent: TotalStats,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
TotalStatsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TotalStatsWithAuth;
