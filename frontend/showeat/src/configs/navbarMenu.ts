/* Function for Navigation Bar Menu Information */
function navbarMenu(isBuyer: boolean) {
    if (isBuyer) {
        return [
            { text: "나의 정보", link: "/buyers/profile", contain: ["/buyers/profile"] },
            { text: "보유 쿠폰", link: "/buyers/coupons", contain: ["/buyers/coupons"] },
            { text: "참여 펀딩", link: "/buyers/myfundings", contain: ["/buyers/myfundings"] },
            { text: "관심 펀딩", link: "/buyers/favorites", contain: ["/buyers/favorites"] },
        ];
    }
    return [
        {
            text: "셀러 정보",
            link: "/sellers/profile/seller-info",
            contain: ["/sellers/profile/seller-info", "/sellers/profile/basic-info"],
        },
        {
            text: "매출 통계",
            link: "/sellers/statistics/monthly",
            contain: ["/sellers/statistics/monthly", "/sellers/statistics/total"],
        },
        { text: "쿠폰 발행 현황", link: "/sellers/coupons", contain: ["/sellers/coupons"] },
        { text: "진행 중 펀딩", link: "/sellers/onboard", contain: ["/sellers/onboard"] },
        { text: "종료된 펀딩", link: "/sellers/closed", contain: ["/sellers/closed"] },
    ];
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default navbarMenu;
