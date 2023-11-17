/* Import */
import { sellerDefaultValue, sellerState } from "@stores/sellers";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

// ----------------------------------------------------------------------------------------------------

/* Hook for Getting and Setting Seller State */
function useSellerState() {
    // States and Variables
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
