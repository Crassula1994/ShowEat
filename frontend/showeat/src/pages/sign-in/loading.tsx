/* Import */
import { getLoginWithKakao } from "@apis/auth";
import { getBusinessInfo } from "@apis/business";
import Head from "next/head";
import LoadingSpinner from "@components/composite/loadingSpinner";
import { setCookie } from "cookies-next";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSellerState from "@hooks/useSellerState";
import useUserState from "@hooks/useUserState";
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
    const [seller, setSeller] = useSellerState();

    const loginKaKao = () => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (code) {
            getLoginWithKakao(code).then((userResult) => {
                if (userResult.data && userResult.data.tokenDto) {
                    const { accessToken, refreshToken } = userResult.data.tokenDto;
                    const {
                        userId,
                        userNickname,
                        userImgUrl,
                        userAddress,
                        userBusiness,
                        userMoney,
                        userPhone,
                        credentialId,
                        userEmail,
                        visited,
                        businessId,
                    } = userResult.data;

                    setCookie("access-token", accessToken);
                    setCookie("refresh-token", refreshToken);
                    setUser({
                        userId,
                        userNickname,
                        userImgUrl,
                        userAddress,
                        userBusiness,
                        userBusinessId: businessId,
                        userMoney,
                        credentialId,
                        userEmail,
                        userPhone,
                        visited,
                    });
                    if (userBusiness) {
                        getBusinessInfo(businessId).then((sellerResult) => {
                            const { businessName, businessImgUrl } = sellerResult.data;
                            setSeller((prev) => {
                                return {
                                    ...prev,
                                    sellerId: businessId,
                                    sellerName: businessName,
                                    sellerImgUrl: businessImgUrl,
                                };
                            });
                        });
                    }

                    if (seller.couponUrl && seller.couponUrl !== "") {
                        router.replace(seller.couponUrl);
                    } else if (visited) {
                        router.replace("/");
                    } else {
                        router.replace("/sign-up");
                    }
                }
            });
        } else {
            router.replace("/sign-in");
        }
    };

    useEffect(() => {
        if (seller && seller.isLoginTry) {
            loginKaKao();
        }
    }, [seller]);

    return (
        <>
            <Head>
                <title>쑈잇 시작하기</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <LoadingContainer>
                <LoadingSpinner />
            </LoadingContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default withAuth({ WrappedComponent: SignInLoading, guardType: "GUEST_ONLY" });
