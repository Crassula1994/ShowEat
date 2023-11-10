/* Import */
import { ComponentWithAuth, WithAuthProps } from "@customTypes/libProps";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------------------------------------

/* Authentication Middleware */
function withAuth<P extends object>(props: WithAuthProps<P>): ComponentWithAuth<P> {
    /* Auth Guard Component */
    function AuthGuard(componentProps: P) {
        // States and Variables
        const { WrappedComponent, guardType = "PUBLIC", redirectUrl = "" } = props;
        const router = useRouter();
        const [isAuth, setIsAuth] = useState<boolean | null>(null);

        // Function for Checking Guard Setting
        const checkGuard = (): boolean => {
            switch (guardType) {
                case "USER_ONLY":
                    return isAuth === true;
                case "GUEST_ONLY":
                    return isAuth === false;
                default:
                    return true;
            }
        };

        useEffect(() => {
            setIsAuth(Boolean(getCookie("access-token")));
        }, []);

        useEffect(() => {
            if (checkGuard() || isAuth === null) {
                return;
            }

            if (redirectUrl) {
                router.replace(redirectUrl);
            } else {
                router.replace("/");
            }
        }, [isAuth]);

        // Return Null If Guard Setting Is Not Satisfied or Component Is Not Rendered
        if (!checkGuard() || isAuth === null) {
            return null;
        }

        return <WrappedComponent {...componentProps} />;
    }

    return AuthGuard;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default withAuth;
