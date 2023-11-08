/* Import */
import { useEffect } from "react";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------------------------------------

/* Route to Seller Info Page */
function SellerProfile() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/sellers/profile/seller-info");
    }, []);

    return null;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SellerProfile;
