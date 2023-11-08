/* Import */
import { useEffect } from "react";
import { useRouter } from "next/router";

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

/* Export */
export default SellerStats;
