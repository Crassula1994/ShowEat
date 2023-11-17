/* Import */
import { useEffect } from "react";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------------------------------------

/* Route to Buyers Profile Page */
function Buyers() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/buyers/profile");
    }, []);

    return null;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Buyers;
