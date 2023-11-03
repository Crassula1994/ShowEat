/* Import */
import Image from "next/image";
import { LoginButton } from "@components/common/button";
import { ReactNode } from "react";
import SingleLayout from "@layouts/SingleLayout";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Style */
const SignInContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;

    // Box Model Attribute
    width: 100vw;
    height: calc(100vh - 80px);
    min-height: 450px;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const HeaderWrapper = styled("div")`
    // Text Attribute
    font-weight: 700;
    font-size: 40px;
`;

const DescriptionWrapper = styled("div")`
    // Text Attribute
    color: ${(props) => props.theme.colors.gray4};
    font-size: 20px;
    b {
        font-size: 20px;
    }
`;

const ImageWrapper = styled("div")`
    // Box Model Attribute
    min-width: 100px;
    min-height: 100px;
    margin: 3em 0;
`;

const ButtonContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    // Box Model Attribute
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Sign In Page */
function SignIn() {
    // States and Variables
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    // Function for Redirecting to Kakao Login Page
    const handleKakaoLogin = () => {
        const KAKAO_BASE_URL: string = "https://kauth.kakao.com/oauth/authorize";
        window.location.href = `${KAKAO_BASE_URL}?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    };

    return (
        <SignInContainer>
            <HeaderWrapper>쑈잇 시작하기</HeaderWrapper>
            <DescriptionWrapper>
                서비스 이용을 위해 <b>카카오</b> 또는 <b>구글</b>로 간편하게 시작해 보세요.
            </DescriptionWrapper>
            <ImageWrapper>
                <Image
                    src="/assets/images/customer-cow.png"
                    width={200}
                    height={200}
                    alt="customer-cow"
                    priority
                />
            </ImageWrapper>
            <ButtonContainer>
                <LoginButton
                    width="25%"
                    onClick={handleKakaoLogin}
                    colorType="kakao"
                    text="카카오로 시작하기"
                />
                <LoginButton width="25%" colorType="google" text="구글로 시작하기" />
            </ButtonContainer>
        </SignInContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
SignIn.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SignIn;
