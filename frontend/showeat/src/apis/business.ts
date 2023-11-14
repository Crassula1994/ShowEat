/* Import */
import { fetchGet, fetchModify } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Verify Business */
const postBusinessInfo = async (
    ceo: string,
    email: string,
    businessName: string,
    startDate: string,
    businessNumber: string,
    newBusinessAddress: string,
    businessPhone: string,
    formData: FormData,
) => {
    const props: FetchProps = {
        url: `business/registration`,
        method: "POST",
        isAuth: true,
        contentType: "file", // or "multipart/form-data"
        params: {
            ceo,
            email,
            businessName,
            startDate,
            businessNumber,
            newBusinessAddress,
            businessPhone,
        },
        data: formData,
    };

    const result = await fetchModify(props);
    return result;
};

/* Function for Business Account */
const postAccountInfo = async (
    accountHolder: string,
    accountBank: string,
    accountNumber: string,
    formData: FormData,
) => {
    const props: FetchProps = {
        url: `business/account`,
        method: "POST",
        isAuth: true,
        contentType: "file", // or "multipart/form-data"
        params: {
            accountHolder,
            accountBank,
            accountNumber,
        },
        data: formData,
    };

    const result = await fetchModify(props);
    return result;
};

/* Function for Getting Business Information */
const getBusinessInfo = async (businessId: number) => {
    const props: FetchProps = {
        url: `business/seller/${businessId}`,
        method: "GET",
        isAuth: false,
    };
    const result = await fetchGet(props);
    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getBusinessInfo, postBusinessInfo, postAccountInfo };
