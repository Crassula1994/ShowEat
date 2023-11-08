/* Import */
import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Seller Info Page */
function SellerInfo() {
    return <div>회원 정보 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const SellerInfoWithAuth = withAuth({
    WrappedComponent: SellerInfo,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
SellerInfoWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SellerInfoWithAuth;
