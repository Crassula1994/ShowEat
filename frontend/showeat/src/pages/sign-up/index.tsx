/* Import */
import { ReactNode } from "react";
import SingleLayout from "@layouts/SingleLayout";

// ----------------------------------------------------------------------------------------------------

/* Sign Up Page */
function SignUp() {
    return <div>정보 입력 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
SignUp.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SignUp;
