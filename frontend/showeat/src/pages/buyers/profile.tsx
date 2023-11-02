/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Buyer Profile Page */
function BuyerProfile() {
    return <div>회원 정보 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
BuyerProfile.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default BuyerProfile;
