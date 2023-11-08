/* Import */
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { sellerDefaultValue, sellerState } from "@stores/users";

// ----------------------------------------------------------------------------------------------------

/* Hook for Getting and Setting User State */
function useSellerState() {
    const [isInitial, setIsInitial] = useState<boolean>(true);
    const [value, setValue] = useRecoilState(sellerState);

    useEffect(() => {
        setIsInitial(false);
    }, []);

    return [isInitial ? sellerDefaultValue : value, setValue] as const;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default useSellerState;
