/* Import */
import { fetchGet } from "@utils/api";
import { FetchProps } from "@customTypes/apiProps";

// ----------------------------------------------------------------------------------------------------

/* Function for Search Fundings */
interface SearchFundingsType {
    keyword: string;
    searchType: string[];
    page: number;
    category?: string[];
    address?: string[];
    max?: number;
    min?: number;
    sortType?: string;
}

const searchFundings = async ({
    keyword,
    searchType,
    page,
    category,
    address,
    max,
    min,
    sortType = "POPULARITY",
}: SearchFundingsType) => {
    const paramsList: Record<string, string> = {
        keyword,
        searchType: searchType.join(","),
        page: page.toString(),
        sortType,
    };

    if (category) {
        paramsList.category = category.join(",");
    }

    if (address) {
        paramsList.address = address.join(",");
    }

    if (max !== undefined) {
        paramsList.max = max.toString();
    }

    if (min !== undefined) {
        paramsList.min = min.toString();
    }

    const props: FetchProps = {
        url: "funding",
        method: "GET",
        isAuth: true,
        params: paramsList,
    };
    const result = await fetchGet(props);

    return result;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default searchFundings;
