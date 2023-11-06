/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for get Funding datas */
interface GetMainPageListType {
    type: string;
}

const getMainPageList = async ({ type }: GetMainPageListType) => {
    const props: FetchProps = {
        url: `funding/home`,
        method: "GET",
        isAuth: false,
        params: { type },
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for get My Fundings */
const getMyFundings = async (page: number) => {
    const props: FetchProps = {
        url: `funding/user`,
        method: "GET",
        isAuth: true,

        params: { page: page.toString() },
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for get My Fundings */
const getBookmarkFundings = async (page: number) => {
    const props: FetchProps = {
        url: `funding/user/bookmark`,
        method: "GET",
        isAuth: true,
        params: { page: page.toString() },
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Bookmark Funding */
const postBookmark = async (fundingId: number) => {
    const props: FetchProps = {
        url: `bookmark/${fundingId}`,
        method: "POST",
        data: {},
        isAuth: true,
    };

    const result = await fetchModify(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getMainPageList, getMyFundings, getBookmarkFundings, postBookmark };
