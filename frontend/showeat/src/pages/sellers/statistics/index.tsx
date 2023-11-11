/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import withAuth from "@/libs/withAuth";
// ----------------------------------------------------------------------------------------------------

/* Route to Seller Statistics Page */
function SellerStats() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/sellers/statistics/monthly");
    }, []);

    return null;
}

// ----------------------------------------------------------------------------------------------------
/* Middleware */
const StatisticsWithAuth = withAuth({ WrappedComponent: SellerStats, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------
/* Layout */
StatisticsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

/* Export */
export default SellerStats;
