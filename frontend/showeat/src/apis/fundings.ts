/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Getting Funding Detail Data */
const getFundingDetail = async (id: string) => {
    const props: FetchProps = {
        url: `funding/${id}`,
        method: "GET",
        isAuth: false,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for get Funding datas */
const getMainPageList = async (type: string) => {
    const props: FetchProps = {
        url: "funding/home",
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

/* Function for active Funding */
const getActiveFunding = async (page: number, state: string) => {
    const props: FetchProps = {
        url: `funding/business/${page}/${state}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);
    return result;
};

/* Function for Inactive Funding */
const getInActiveFunding = async (page: number, state: string) => {
    const props: FetchProps = {
        url: `funding/business/${page}/${state}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);
    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export {
    getFundingDetail,
    getMainPageList,
    getMyFundings,
    getBookmarkFundings,
    postBookmark,
    getActiveFunding,
    getInActiveFunding,
};
