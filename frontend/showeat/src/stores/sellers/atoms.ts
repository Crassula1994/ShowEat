/* Import */
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { SellerType } from "@customTypes/storeProps";

// ----------------------------------------------------------------------------------------------------

/* Persist */
const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
    key: "sellerStorage",
    storage: sessionStorage,
});

// ----------------------------------------------------------------------------------------------------

/* States */
const sellerDefaultValue: SellerType = {
    sellerId: 0,
    sellerName: "",
    sellerImgUrl: "https://showeatbucket.s3.ap-northeast-2.amazonaws.com/user/basic-profile.png",
    couponUrl: "",
};

const sellerState = atom<SellerType>({
    key: "sellerState",
    default: sellerDefaultValue,
    effects_UNSTABLE: [persistAtom],
});

// ----------------------------------------------------------------------------------------------------

/* Export */
export { sellerDefaultValue, sellerState };
