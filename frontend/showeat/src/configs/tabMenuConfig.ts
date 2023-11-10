/* Buyers Coupons Tab Menu Config */
const buyersCouponsTabMenuConfig = [
    { id: "active", labelText: "사용 가능", redirectUrl: "/buyers/coupons/active" },
    { id: "used", labelText: "사용 완료", redirectUrl: "/buyers/coupons/used" },
    { id: "expired", labelText: "사용 불가", redirectUrl: "/buyers/coupons/expired" },
];

/* Funding Tab Menu Config */
const fundingTabMenuConfig = [
    { id: "store", labelText: "셀러 정보", redirectUrl: "/fundings/[fundingId]/store" },
    { id: "review", labelText: "리뷰", redirectUrl: "/fundings/[fundingId]/review" },
];

// ----------------------------------------------------------------------------------------------------

/* Export */
export { buyersCouponsTabMenuConfig, fundingTabMenuConfig };
