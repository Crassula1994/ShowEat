/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Buyer Favorites Page */
function Favorites() {
    return <div>회원 관심 받는 페이지입니다.</div>;
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const FavoritesWithAuth = withAuth({
    WrappedComponent: Favorites,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
FavoritesWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FavoritesWithAuth;
