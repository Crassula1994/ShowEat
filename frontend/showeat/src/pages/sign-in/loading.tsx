/* Import */
import { getLoginWithKakao } from "@apis/auth";
import LoadingSpinner from "@components/loadingSpinner";
import { setCookie } from "cookies-next";
import styled from "@emotion/styled";
import { useEffect } from "react";
import useUserState from "@hooks/useUserState";
import { useRouter } from "next/router";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Style */
const LoadingContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3em;

    // Box Model Attribute
    width: 100vw;
    height: 100vh;
`;

// ----------------------------------------------------------------------------------------------------

/* Sign In Loading Page */
function SignInLoading() {
    // States and Variables
    const router = useRouter();
    const [, setUser] = useUserState();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
            getLoginWithKakao(code).then((result) => {
                const { accessToken, refreshToken } = result.data.tokenDto;
                const {
                    userId,
                    userNickname,
                    userImgUrl,
                    userAddress,
                    userBusiness,
                    visited,
                    userMoney,
                    userPhone,
                } = result.data;

                setCookie("access-token", accessToken);
                setCookie("refresh-token", refreshToken);
                setUser({
                    userId,
                    userNickname,
                    userImgUrl,
                    userAddress,
                    userBusiness,
                    userMoney,
                    userPhone,
                    visited,
                });

                if (visited) {
                    router.replace("/");
                } else {
                    router.replace("/sign-up");
                }
            });
        } else {
            router.replace("/sign-in");
        }
    }, []);

    return (
        <LoadingContainer>
            <LoadingSpinner />
        </LoadingContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default withAuth({ WrappedComponent: SignInLoading, guardType: "GUEST_ONLY" });
