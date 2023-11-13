/* Import */
import SellerLayout from "@layouts/SellerLayout";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import withAuth from "@/libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Route to Seller Info Page */
function SellerProfile() {
    // States and Variables
    const router = useRouter();

    // Hook for Routing Seller Info Page
    useEffect(() => {
        router.replace("/sellers/profile/seller-info");
    }, []);

    return null;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const SellerProfileWithAuth = withAuth({ WrappedComponent: SellerProfile, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
SellerProfileWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SellerProfileWithAuth;
