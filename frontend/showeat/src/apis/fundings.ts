/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Canceling Funding Join */
const deleteFundingJoin = async (fundingId: string) => {
    const props: FetchProps = {
        url: `funding/user/${fundingId}`,
        method: "DELETE",
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

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

/* Function for Getting Funding Detail User Data */
const getFundingUserDetail = async (userId: number, fundingId: string) => {
    const props: FetchProps = {
        url: `funding/${fundingId}/user/${userId}`,
        method: "GET",
        isAuth: true,
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

/* Function for get My Bookmark Fundings */
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

/* Function for Applying Funding Join */
const postFundingJoin = async (fundingId: string) => {
    const props: FetchProps = {
        url: `funding/user/${fundingId}`,
        method: "POST",
        isAuth: true,
    };
    const result = await fetchModify(props);

    return result;
};

/* Function for Create Funding */
interface CreateFundingProps {
    category: string;
    description: string;
    endDate: string;
    maxLimit: number;
    minLimit: number;
    tags: string[];
    title: string;
    menuRequestDtos: {
        discountPrice: number;
        menuId: number;
    };
}

const createFunding = async ({
    category,
    description,
    endDate,
    maxLimit,
    minLimit,
    tags,
    title,
    menuRequestDtos,
}: CreateFundingProps) => {
    const props: FetchProps = {
        url: `funding`,
        method: "POST",
        data: { category, description, endDate, tags, title, menuRequestDtos, maxLimit, minLimit },
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

/* Function for user Fundings */
const getUserFundings = async (page: number) => {
    const props: FetchProps = {
        url: `funding/user/${page}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);
    return result;
};

/* Function for user favorite Fundings */
const getFavoriteFundings = async (page: number) => {
    const props: FetchProps = {
        url: `funding/user/bookmark/${page}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);
    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export {
    deleteFundingJoin,
    getFundingDetail,
    getFundingUserDetail,
    getMainPageList,
    getMyFundings,
    getBookmarkFundings,
    postFundingJoin,
    getActiveFunding,
    getInActiveFunding,
    getUserFundings,
    getFavoriteFundings,
    createFunding,
};
