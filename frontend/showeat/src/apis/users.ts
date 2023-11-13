/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Getting User Information */
const getUserInfo = async (userId: number) => {
    const props: FetchProps = {
        url: `users/${userId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Setting Information at First */
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

const patchNickname = async (userId: number, userNickname: string) => {
    const props: FetchProps = {
        url: "users/nickname",
        method: "PATCH",
        data: { userId, userNickname },
        isAuth: true,
    };
    console.log(userId, userNickname);
    const result = await fetchModify(props);
    return result;
};

const patchPhone = async (userId: number, userPhone: string) => {
    const props: FetchProps = {
        url: "users/phone",
        method: "PATCH",
        data: { userId, userPhone },
        isAuth: true,
    };
    const result = await fetchModify(props);
    return result;
};

const patchAddress = async (userId: number, userAddress: string) => {
    const props: FetchProps = {
        url: "users/address",
        method: "PATCH",
        data: { userId, userAddress },
        isAuth: true,
    };
    const result = await fetchModify(props);
    return result;
};
// ----------------------------------------------------------------------------------------------------

/* Export */
export { getUserInfo, patchSettingInfo, patchNickname, patchPhone, patchAddress };
