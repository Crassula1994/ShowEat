/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for get My Coupons */

/* 내 쿠폰 가져오는 함수 */
const getCouponList = async (userId: number, status: string) => {
    console.log(userId, " ", status);
    const props: FetchProps = {
        url: `coupon/${userId}/${status}`,
        method: "GET",
        isAuth: true,
    };

    const result = await fetchGet(props);
    return result;
};

// Export the function as the default export
export default getCouponList;
