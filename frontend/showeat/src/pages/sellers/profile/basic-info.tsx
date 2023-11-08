/* Import */
import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Seller Basic Info Page */
function BasicInfo() {
    return <div>셀러 기본 정보 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const BasicInfoWithAuth = withAuth({
    WrappedComponent: BasicInfo,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
BasicInfoWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default BasicInfoWithAuth;
