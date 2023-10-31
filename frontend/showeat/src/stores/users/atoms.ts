/* Import */
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// ----------------------------------------------------------------------------------------------------

/* Persist */
const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
    key: "userState",
    storage: sessionStorage,
});

// ----------------------------------------------------------------------------------------------------

/* States */
const userIdState = atom<number>({
    key: "userIdState",
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

const userNicknameState = atom<string>({
    key: "userNicknameState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

const userImgUrlState = atom<string>({
    key: "userImgURLState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

const userAddressState = atom<string>({
    key: "userAdressState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

const userBusinessState = atom<boolean>({
    key: "userBusinessState",
    default: false,
    effects_UNSTABLE: [persistAtom],
});

const userMoneyState = atom<number>({
    key: "userMoneyState",
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

// ----------------------------------------------------------------------------------------------------

/* Export */
export {
    userIdState,
    userNicknameState,
    userImgUrlState,
    userAddressState,
    userBusinessState,
    userMoneyState,
};
