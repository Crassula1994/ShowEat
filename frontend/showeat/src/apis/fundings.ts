/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";
import addressList from "@/configs/addressList";

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

/* Function for Getting Funding data */
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

/* Function for Creating Funding */
interface CreateFundingProps {
    fundingType: string;
    category: string;
    description: string;
    endDate: string;
    maxLimit?: number;
    minLimit: number;
    tags: string[];
    title: string;
    discountPrice: number;
    price?: number;
    menuId?: number;
}

const createFunding = async ({
    fundingType,
    category,
    description,
    endDate,
    maxLimit = 50000000,
    minLimit,
    tags,
    title,
    menuId,
    discountPrice,
    price,
}: CreateFundingProps) => {
    const props: FetchProps = {
        url: `funding`,
        method: "POST",
        data: {
            fundingType,
            category,
            description,
            endDate,
            tags,
            title,
            menuId,
            discountPrice,
            maxLimit,
            minLimit,
            price,
        },
        isAuth: true,
    };

    const result = await fetchModify(props);

    return result;
};

/* Function for Posting Gift Card Image */
const postGiftcardImage = async (multipartFile: File, fundingId: number) => {
    const formData = new FormData();

    formData.append(`multipartFile`, multipartFile);

    const props: FetchProps = {
        url: `funding/image/${fundingId}`,
        method: "POST",
        contentType: "file",
        isAuth: true,
        data: formData,
    };

    const result = await fetchModify(props);

    return result;
};

/* Function for Getting Active Funding of Seller */
const getSellerActiveFunding = async (page: number) => {
    const props: FetchProps = {
        url: `funding/business/${page}/ACTIVE`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Getting Active Funding List of Seller */
const getSellerFundingList = async (businessId: number) => {
    const props: FetchProps = {
        url: `funding/business/active/${businessId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Getting Inactive Funding of Seller */
const getSellerInactiveFunding = async (page: number) => {
    const props: FetchProps = {
        url: `funding/business/${page}/INACTIVE`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Getting User Fundings */
const getUserFundings = async (page: number) => {
    const props: FetchProps = {
        url: `funding/user/${page}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);
    return result;
};

/* Function for Getting User Favorite Fundings */
const getFavoriteFundings = async (page: number) => {
    const props: FetchProps = {
        url: `funding/user/bookmark/${page}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);
    return result;
};

/* Function for Searching Fundings */
interface SearchFundingsProps {
    keyword: string;
    category?: string[] | string | undefined;
    address?: string[] | undefined;
    min?: number | undefined;
    max?: number | undefined;
    searchType?: string[] | undefined;
    sortType?: string | undefined;
    page: number | undefined;
}

const searchFundings = async ({
    keyword,
    category = [
        "KOREAN",
        "CHINESE",
        "JAPANESE_SUSHI",
        "WESTERN",
        "CHICKEN_BURGER",
        "ASIAN",
        "SNACKS_LATE_NIGHT",
        "CAFE_DESSERT",
    ],
    address = addressList,
    min = 0,
    max = 100000000,
    searchType = ["BUSINESS_NAME", "FUNDING_MENU", "FUNDING_TAG"],
    sortType = "POPULARITY",
    page,
}: SearchFundingsProps) => {
    let categoryValue;
    if (category) {
        if (typeof category === "string") {
            categoryValue = [category];
        } else if (category.length > 0) {
            categoryValue = category;
        } else {
            categoryValue = undefined;
        }
    } else {
        categoryValue = undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = {
        keyword,
        category: categoryValue,
        address: address && address.length > 0 ? address : undefined,
        min,
        max,
        searchType: searchType && searchType.length > 0 ? searchType : undefined,
        sortType,
        page,
    };

    Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);

    const props: FetchProps = {
        url: `funding`,
        method: "GET",
        isAuth: false,
        params,
    };

    const result = await fetchGet(props);
    return result;
};

/* Function for Searching One Category Fundings */
interface CategoryFundingProps {
    category: string;
    sortType?: string;
    page: number;
}

const getCategoryFundings = async ({
    category,
    page,
    sortType = "POPULARITY",
}: CategoryFundingProps) => {
    const props: FetchProps = {
        url: `funding/home/category`,
        method: "GET",
        isAuth: false,
        params: { category, sortType, page: page.toString() },
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Getting Funding Reviews */
const getFundingReview = async (fundingId: number, page: number) => {
    const props: FetchProps = {
        url: `review`,
        method: "GET",
        isAuth: true,
        params: { fundingId: fundingId.toString(), page: page.toString() },
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
    postFundingJoin,
    getSellerActiveFunding,
    getSellerFundingList,
    getSellerInactiveFunding,
    getUserFundings,
    getFavoriteFundings,
    createFunding,
    searchFundings,
    postGiftcardImage,
    getFundingReview,
    getCategoryFundings,
};
