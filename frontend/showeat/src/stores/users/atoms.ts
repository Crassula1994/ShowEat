/* Import */
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { SellerType, UserType } from "@customTypes/storeProps";

// ----------------------------------------------------------------------------------------------------

/* Persist */
const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
    key: "userStorage",
    storage: sessionStorage,
});

// ----------------------------------------------------------------------------------------------------

/* States */
const userDefaultValue: UserType = {
    userId: 0,
    userNickname: "",
    userImgUrl: "https://showeatbucket.s3.ap-northeast-2.amazonaws.com/user/basic-profile.png",
    userAddress: "",
    userBusiness: false,
    userMoney: 0,
    userPhone: "",
    visited: false,
};

const userState = atom<UserType>({
    key: "userState",
    default: userDefaultValue,
    effects_UNSTABLE: [persistAtom],
});

const sellerDefaultValue: SellerType = {
    sellerId: 0,
    sellerName: "",
    sellerImgUrl: "https://showeatbucket.s3.ap-northeast-2.amazonaws.com/user/basic-profile.png",
};

const sellerState = atom<SellerType>({
    key: "sellerState",
    default: sellerDefaultValue,
    effects_UNSTABLE: [persistAtom],
});

// ----------------------------------------------------------------------------------------------------

/* Export */
export { userDefaultValue, userState, sellerDefaultValue, sellerState };
