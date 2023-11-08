/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for get My Coupons */
const getCouponList = async (userId: number, status: string, page: number) => {
    console.log(userId, " ", status);
    const props: FetchProps = {
        url: `coupon/${userId}/${status}/${page}`,
        method: "GET",
        isAuth: true,
    };

    const result = await fetchGet(props);
    const data = Array.isArray(result.data.couponListResponseDtos) ? result.data : [];
    return data;
};

const getCouponDetails = async (couponId: number) => {
    const props: FetchProps = {
        url: `coupon/${couponId}`,
        method: "GET",
        isAuth: true,
    };
    const data = await fetchGet(props);
    return data;
};

// Export the function as the default export
export { getCouponList, getCouponDetails };
