/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Getting Review List */
const getReviewList = async (businessId: number, page: number) => {
    const props: FetchProps = {
        url: "review",
        method: "GET",
        params: { businessId: businessId.toString(), page: page.toString() },
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default getReviewList;
