/* Export */
export interface UserType {
    userId: number;
    userNickname: string;
    userImgUrl: string;
    userAddress: string;
    userBusiness: boolean;
    userBusinessId: number;
    userMoney: number;
    userPhone: string;
    visited: boolean;
    credentialId: string;
    userEmail: string;
}

export interface SellerType {
    sellerId: number;
    sellerName: string;
    sellerImgUrl: string;
    couponUrl: string;
    isLoginTry: boolean;
}
