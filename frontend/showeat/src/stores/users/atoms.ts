/* Import */
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { UserType } from "@customTypes/storeProps";

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
    userImgUrl: "",
    userAddress: "",
    userBusiness: false,
    userMoney: 0,
};

const userState = atom<UserType>({
    key: "userState",
    default: userDefaultValue,
    effects_UNSTABLE: [persistAtom],
});

// ----------------------------------------------------------------------------------------------------

/* Export */
export { userState, userDefaultValue };
