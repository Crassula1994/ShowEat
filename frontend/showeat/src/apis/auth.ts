/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Authentificaion with Kakao API */
const authWithKakao = async (code: string) => {
    const props: FetchProps = {
        url: "auth/login/kakao",
        method: "GET",
        isAuth: false,
        params: { code },
    };
    const result = await fetchGet(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default authWithKakao;
