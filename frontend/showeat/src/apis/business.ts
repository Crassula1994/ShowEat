/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Getting Business Information */
const getBusinessInfo = async (businessId: number) => {
    const props: FetchProps = {
        url: `business/seller/${businessId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Function for Modify Business Information */
const modifyBusinessInfo = async (file: File[]) => {
    const props: FetchProps = {
        url: `business/seller/profile`,
        method: "PATCH",
        isAuth: true,
        data: { businessImg: file[0] },
    };

    const result = await fetchGet(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getBusinessInfo, modifyBusinessInfo };
