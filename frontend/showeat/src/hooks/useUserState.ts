/* Import */
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userDefaultValue, userState } from "@stores/users";

// ----------------------------------------------------------------------------------------------------

/* Hook for Getting and Setting User State */
function useUserState() {
    const [isInitial, setIsInitial] = useState<boolean>(true);
    const [value, setValue] = useRecoilState(userState);

    useEffect(() => {
        setIsInitial(false);
    }, []);

    return [isInitial ? userDefaultValue : value, setValue] as const;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default useUserState;
