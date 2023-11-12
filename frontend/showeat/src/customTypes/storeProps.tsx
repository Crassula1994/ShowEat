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
}

export interface SellerType {
    sellerId: number;
    sellerName: string;
    sellerImgUrl: string;
}
