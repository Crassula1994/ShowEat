/* Import */
import { CookieValueTypes } from "cookies-next";
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Authentificaion with Kakao API */
const getLoginWithKakao = async (code: string) => {
    const props: FetchProps = {
        url: "auth/login/kakao",
        method: "GET",
        isAuth: false,
        params: { code },
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Handling Logout */
const patchLogout = async (userId: number, accessToken: CookieValueTypes) => {
    const props: FetchProps = {
        url: "auth/logout",
        method: "PATCH",
        data: { userId, accessToken },
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getLoginWithKakao, patchLogout };
