import { useEffect } from "react";
import { useRouter } from "next/router";

function Funding() {
    const router = useRouter();
    const { fundingId } = router.query;

    useEffect(() => {
        if (!fundingId) {
            return;
        }
        router.replace(`/fundings/${fundingId}/review`);
    }, [fundingId]);
    return <div />;
}

export default Funding;
