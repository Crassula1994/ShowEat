/* Import */
import MainLayout from "@layouts/MainLayout";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Funding Page */
function Funding() {
    // States and Variables
    const router = useRouter();
    const { fundingId } = router.query;

    // Hook for Routing Funding Store Page
    useEffect(() => {
        if (!fundingId) {
            return;
        }
        router.replace(`/fundings/${fundingId}/store`);
    }, [fundingId]);

    return null;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const FundingWithAuth = withAuth({ WrappedComponent: Funding });

// ----------------------------------------------------------------------------------------------------

/* Layout */
FundingWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingWithAuth;
