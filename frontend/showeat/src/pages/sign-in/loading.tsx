/* Import */
import authWithKakao from "@apis/auth";
import LoadingSpinner from "@components/loadingSpinner";
import { setCookie } from "cookies-next";
import styled from "@emotion/styled";
import { useEffect } from "react";
import useUserState from "@hooks/useUserState";
import { useRouter } from "next/router";

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
            authWithKakao(code).then((result) => {
                const { accessToken } = result.data.tokenDto;
                const {
                    userId,
                    userNickname,
                    userImgUrl,
                    userAddress,
                    userBusiness,
                    visited,
                    userMoney,
                } = result.data;

                setCookie("access-token", accessToken);
                setUser({
                    userId,
                    userNickname,
                    userImgUrl,
                    userAddress,
                    userBusiness,
                    userMoney,
                });

                if (visited) {
                    router.replace("/");
                } else {
                    router.replace("/sign-up");
                }
            });
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
export default SignInLoading;
