/* Import */
import SellerLayout from "@layouts/SellerLayout";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import withAuth from "@/libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Route to Seller Statistics Page */
function Statistics() {
    // States and Variables
    const router = useRouter();

    // Hook for Routing Seller Statistics Monthly Page
    useEffect(() => {
        router.replace("/sellers/statistics/monthly");
    }, []);

    return null;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const StatisticsWithAuth = withAuth({ WrappedComponent: Statistics, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
StatisticsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Statistics;
