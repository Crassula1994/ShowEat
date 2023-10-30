/* Export */
export interface FetchProps {
    url: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    params?: Record<string, string>;
    data?: unknown;
    isAuth: boolean;
    contentType?: "json" | "file";
    cache?: boolean;
    revalidate?: false | number;
    tags?: string[];
}

export interface FetchOptionProps {
    method: "GET" | "POST" | "PATCH" | "DELETE";
    headers: Record<string, string>;
    body?: string;
    credentials?: RequestCredentials;
    cache?: "force-cache" | "no-store";
    next?: {
        revalidate?: false | number;
        tags?: string[];
    };
}
