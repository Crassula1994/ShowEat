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

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getUserInfo, patchSettingInfo };
