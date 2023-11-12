/* Export */
export interface CouponType {
    businessImgUrl: string;
    businessName: string;
    couponId: number;
    couponPrice: number;
    couponQrCodeImgUrl: string;
    couponStatus: "ACTIVE" | "USED" | "EXPIRED";
    couponType: "SINGLE" | "GIFTCARD";
    expirationDate: string;
    fundingDiscountPrice: number;
    fundingImgUrl: string;
    fundingMenu: string;
    fundingPrice: number;
    fundingTitle: string;
    remainingDays: number;
}

export interface TotalStatisticsType {
    businessName: string;
    totalFailFundingCnt: number;
    totalFundingParticipantsCnt: number;
    totalRevenue: number;
    totalSuccessFundingCnt: number;
}

export interface MonthlyStatisticsType {
    year: number;
    month: number;
    revenue: number;
    successFundingCnt: number;
    fundingParticipantsCnt: number;
    failFundingCnt: number;
}

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
    body?: string | FormData;
    credentials?: RequestCredentials;
    cache?: "force-cache" | "no-store";
    next?: {
        revalidate?: false | number;
        tags?: string[];
    };
}

export interface FundingType {
    fundingId: number;
    businessName: string;
    title: string;
    category: string;
    maxLimit: number;
    minLimit: number;
    curCount: number;
    menu: string;
    price: number;
    discountPrice: number;
    discountRate: number;
    description: string;
    startDate: string;
    endDate: string;
    fundingIsActive: "ACTIVE" | "INACTIVE";
    fundingIsSuccess: "SUCCESS" | "FAIL" | "UNDECIDED";
    fundingTagResponseDtos: {
        tagId: number;
        fundingTag: string;
    }[];
    fundingImageResponseDtos: {
        imageId: number;
        imageUrl: string;
    }[];
    bookmarkCount: number;
    fundingIsBookmark: boolean;
}
