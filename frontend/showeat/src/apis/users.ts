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

/* Function for Deleting User Profile Image */
const patchDeleteUserProfile = async (userId: number) => {
    const props: FetchProps = {
        url: `users/delete-profile-image/${userId}`,
        method: "PATCH",
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

/* Function for Modifying User Profile Image */
const patchUpdateUserProfile = async (userId: number, imageFile: File[]) => {
    const formData = new FormData();
    formData.append("files", imageFile[0]);

    const props: FetchProps = {
        url: `users/update-profile-image/${userId}`,
        method: "PATCH",
        data: formData,
        isAuth: true,
        contentType: "file",
    };
    const result = await fetchModify(props);

    return result;
};

/* Function for Patching User Nickname */
const patchNickname = async (userId: number, userNickname: string) => {
    const props: FetchProps = {
        url: "users/nickname",
        method: "PATCH",
        data: { userId, userNickname },
        isAuth: true,
    };
    const result = await fetchModify(props);
    return result;
};

/* Function for Patching User Phone Number */
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

/* Function for Patching User Address */
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
export {
    getUserInfo,
    patchAddress,
    patchNickname,
    patchPhone,
    patchSettingInfo,
    patchDeleteUserProfile,
    patchUpdateUserProfile,
};
