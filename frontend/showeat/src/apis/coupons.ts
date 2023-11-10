/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Getting Coupon List */
const getCouponList = async (userId: number, status: string, page: number) => {
    const props: FetchProps = {
        url: `coupon/${userId}/${status}/${page}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Getting Coupon Information */
const getCouponDetails = async (couponId: number) => {
    const props: FetchProps = {
        url: `coupon/${couponId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getCouponList, getCouponDetails };
