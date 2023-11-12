/* Import */
import { fetchGet, fetchModify } from "@utils/api";
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

/* Function for Use Single Coupon */
const patchUseCoupon = async (couponId: number) => {
    const props: FetchProps = {
        url: `coupon/update/status`,
        method: "PATCH",
        data: { couponId, couponStatus: "USED" },
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

/* Function for Use Single Coupon */
interface PatchUseGiftcardProps {
    couponId: number;
    couponAmount: number;
}

const patchUseGiftcard = async ({ couponId, couponAmount }: PatchUseGiftcardProps) => {
    const props: FetchProps = {
        url: `coupon/update/price`,
        method: "PATCH",
        data: { couponId, couponAmount },
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getCouponList, getCouponDetails, patchUseCoupon, patchUseGiftcard };
