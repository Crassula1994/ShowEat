/* Import */
import MainLayout from "@layouts/MainLayout";
import { ReactNode } from "react";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Style */
const SignInContainer = styled("div")``;

// ----------------------------------------------------------------------------------------------------

/* Sign In Page */
function SignIn() {
    return <SignInContainer>로그인 페이지입니다.</SignInContainer>;
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
SignIn.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SignIn;
