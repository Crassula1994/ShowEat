/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Coupons Page */
function Coupons() {
    // States and Variables
    const router = useRouter();

    // Hook for Routing Coupons Active Page
    useEffect(() => {
        router.replace(`/buyers/coupons/active`);
    }, []);

    return null;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const CouponsWithAuth = withAuth({ WrappedComponent: Coupons, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
CouponsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default CouponsWithAuth;
