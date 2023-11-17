/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Functions for Getting Monthly Statistics */
const getMonthlyStatistic = async (businessId: number) => {
    const props: FetchProps = {
        url: `business/stat/monthly/${businessId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

/* Functions for Getting Total Statistics */
const getTotalStatistic = async (businessId: number) => {
    const props: FetchProps = {
        url: `business/stat/total/${businessId}`,
        method: "GET",
        isAuth: true,
    };
    const result = await fetchGet(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export { getMonthlyStatistic, getTotalStatistic };
