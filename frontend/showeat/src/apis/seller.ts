/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

/* Function for Getting User Information */
const getSellerInfo = async (sellerId: number) => {
    const props: FetchProps = {
        url: `business/seller/${sellerId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

const getBusinessRegiInfo = async (sellerId: number) => {
    const props: FetchProps = {
        url: `business/registration/${sellerId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Modifying Seller Profile Image */
const patchSellerProfile = async (file: File[]) => {
    const formData = new FormData();
    formData.append("businessImg", file[0]);

    const props: FetchProps = {
        url: "business/seller/profile",
        method: "PATCH",
        data: formData,
        isAuth: true,
        contentType: "file",
    };
    const result = await fetchModify(props);

    return result;
};

const patchSellerBio = async (businessBio: string) => {
    const props: FetchProps = {
        url: "business/seller/bio",
        method: "PATCH",
        data: { businessBio },
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

const patchSellerOperatingTime = async (operatingTime: string) => {
    const props: FetchProps = {
        url: "business/seller/operating-time",
        method: "PATCH",
        data: { operatingTime },
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

const patchSellerClosedDays = async (businessClosedDays: string) => {
    const props: FetchProps = {
        url: "business/seller/closed-days",
        method: "PATCH",
        data: { businessClosedDays },
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

const patchSettingInfo = async (
    userId: number,
    userNickname: string,
    userPhone: string,
    userAddress: string,
) => {
    const props: FetchProps = {
        url: "users/setting-info",
        method: "PATCH",
        data: { userId, userNickname, userPhone, userAddress },
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

/* Export */
export {
    getSellerInfo,
    getBusinessRegiInfo,
    patchSellerProfile,
    patchSellerBio,
    patchSellerOperatingTime,
    patchSellerClosedDays,
    patchSettingInfo,
};
