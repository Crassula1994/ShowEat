/* Import */
import { FetchProps, FetchOptionProps } from "@customTypes/apiProps";
import handleFetchError from "@utils/fetchError";
import { getCookie } from "cookies-next";

// ----------------------------------------------------------------------------------------------------

/* Variables */
const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;

// ----------------------------------------------------------------------------------------------------

/* Function for Fetching GET Method */
async function fetchGet(props: FetchProps) {
    const {
        url,
        method = "GET",
        isAuth,
        params = {},
        contentType = "json",
        cache = true,
        revalidate = false,
        tags = [],
    } = props;

    const headers: Record<string, string> = {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": `http://localhost:3000`,
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": contentType === "json" ? "application/json" : "multipart/form-data",
    };

    const queryString: string =
        Object.keys(params).length > 0 ? `?${new URLSearchParams(params).toString()}` : "";

    if (isAuth) {
        const accessToken = getCookie("access-token");
        if (accessToken) {
            headers.Authorization = accessToken;
        }
    }

    const options: FetchOptionProps = {
        method,
        headers,
        credentials: isAuth ? "include" : "omit",
        cache: cache ? "force-cache" : "no-store",
        next: {
            revalidate,
            tags,
        },
    };

    try {
        const response = await fetch(`${ENDPOINT}${url}${queryString}`, options);
        const fetchResult = await response.json();

        if (fetchResult && fetchResult.statusCode === 200) {
            return fetchResult;
        }
        return handleFetchError(fetchResult.statusCode);
    } catch (error) {
        throw error;
    }
}

/* Function for Fetching POST, PATCH, DELETE Method */
async function fetchModify(props: FetchProps) {
    const {
        url,
        method,
        data,
        params = {},
        isAuth,
        contentType = "json",
        cache = true,
        revalidate = false,
        tags = [],
    } = props;

    const headers: Record<string, string> = {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": `http://localhost:3000`,
        "Access-Control-Allow-Methods": "POST, OPTIONS, PUT, PATCH, DELETE",
        ...(contentType === "json" && { "Content-Type": "application/json" }),
        // 이거 주석처리로 하니까 잘 보내짐. - 시균's solution
        //         : `multipart/form-data; boundary= #$@boundary#@$`,
    };

    if (isAuth) {
        const accessToken = getCookie("access-token");
        if (accessToken) {
            headers.Authorization = accessToken;
        }
    }

    const queryString: string =
        Object.keys(params).length > 0 ? `?${new URLSearchParams(params).toString()}` : "";

    const handleData = () => {
        if (data) {
            if (contentType === "json") {
                return JSON.stringify(data);
            }
            if (data instanceof FormData) {
                // if (contentType === "file") {
                return data;
            }
            return undefined;
        }
        return undefined;
    };

    const options: FetchOptionProps = {
        method,
        headers,
        body: handleData(),
        credentials: isAuth ? "include" : "omit",
        cache: cache ? "force-cache" : "no-store",
        next: {
            revalidate,
            tags,
        },
    };

    try {
        const response = await fetch(`${ENDPOINT}${url}${queryString}`, options);
        const fetchResult = await response.json();

        if (fetchResult && fetchResult.statusCode === 200) {
            return fetchResult;
        }
        return handleFetchError(fetchResult.statusCode);
    } catch (error) {
        throw error;
    }
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export { fetchGet, fetchModify };
