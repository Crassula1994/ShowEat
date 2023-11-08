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

    const queryString: string = params ? `?${new URLSearchParams(params).toString()}` : "";

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
        "Content-Type": contentType === "json" ? "application/json" : "multipart/form-data",
    };

    if (isAuth) {
        const accessToken = getCookie("access-token");
        if (accessToken) {
            headers.Authorization = accessToken;
        }
    }

    const options: FetchOptionProps = {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        credentials: isAuth ? "include" : "omit",
        cache: cache ? "force-cache" : "no-store",
        next: {
            revalidate,
            tags,
        },
    };

    try {
        const response = await fetch(`${ENDPOINT}${url}`, options);
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
