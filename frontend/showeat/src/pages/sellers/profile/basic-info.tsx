/* Import */
import SellerLayout from "@layouts/SellerLayout";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Seller Basic Info Page */
function BasicInfo() {
    return <div>셀러 기본 정보 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
BasicInfo.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default BasicInfo;
