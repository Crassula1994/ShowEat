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
    userNickname: "본웅이는아가야지켜조야해",
    userImgUrl: "/assets/images/service-logo.png",
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
