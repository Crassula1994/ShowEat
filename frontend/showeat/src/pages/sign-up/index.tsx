/* Import */
import addressList from "@configs/addressList";
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from "react";
import { formatPhoneNumber } from "@utils/format";
import { InputDropdown } from "@components/common/dropdown";
import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { getUserInfo, patchSettingInfo } from "@apis/users";
import SingleLayout from "@layouts/SingleLayout";
import styled from "@emotion/styled";
import { TextButton } from "@components/common/button";
import { TextInput } from "@components/common/input";
import { useRouter } from "next/router";
import useUserState from "@hooks/useUserState";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Style */
const SignUpContainer = styled("form")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;

    // Box Model Attribute
    width: 100vw;
    height: calc(100vh - 80px);
    min-height: 450px;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const HeaderWrapper = styled("div")`
    // Text Attribute
    font-weight: 700;
    font-size: 40px;
`;

const DescriptionWrapper = styled("div")`
    // Text Attribute
    color: ${(props) => props.theme.colors.gray4};
    font-size: 20px;
    span {
        font-size: 20px;
        font-weight: 700;
        text-decoration: underline;
    }
`;

const InputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    gap: 1em;

    // Box Model Attribute
    width: 25%;
    margin: 2em 0;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
`;

// ----------------------------------------------------------------------------------------------------

/* Server Side Rendering */
export const getServerSideProps: GetServerSideProps = async () => {
    const userId = getCookie("user-id");
    // console.log(userId);
    if (userId) {
        // console.log("대체 왜?");
        const result = await getUserInfo(+userId);
        const { visited } = result.data;

        if (visited) {
            // console.log("왜 안됨?");
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
                props: {},
            };
        }
    }

    return {
        props: {},
    };
};

// ----------------------------------------------------------------------------------------------------

/* Sign Up Page */
function SignUp() {
    // States and Variables
    const [user, setUser] = useUserState();
    const [nickname, setNickname] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const router = useRouter();

    // Function for Handling Nickname Change
    const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value.trim());
    };

    // Function for Handling Phone Number Change
    const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhoneNumber(event.target.value));
    };

    // Function for Handling Phone Number Change
    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target?.value);
    };

    // Function for Submitting
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (user.userId !== 0) {
            const rawPhone = phone.replace(/-/g, "");
            patchSettingInfo(user.userId, nickname, rawPhone, address).then(() => {
                setUser((prevState) => ({
                    ...prevState,
                    userNickname: nickname,
                    userPhone: phone,
                    userAddress: address,
                    visited: true,
                }));
                router.replace("/");
            });
        }
    };

    useEffect(() => {
        if (user.visited) {
            router.replace("/");
        }

        if (user) {
            setNickname(user.userNickname ?? "");
            setPhone(formatPhoneNumber(user.userPhone ?? ""));
            setAddress(user.userAddress ?? "");
        }
    }, [user]);

    return (
        <SignUpContainer onSubmit={handleSubmit}>
            <HeaderWrapper>개인정보 입력</HeaderWrapper>
            <DescriptionWrapper>
                서비스 이용을 위해 필요한 <span>필수 개인정보</span>를 입력해 주세요.
            </DescriptionWrapper>
            <InputContainer>
                <TextInput
                    width="100%"
                    id="nickname"
                    value={nickname}
                    labelText="닉네임"
                    onChange={handleNicknameChange}
                />
                <TextInput
                    width="100%"
                    id="phone"
                    value={phone}
                    placeholder="010-1234-5678"
                    labelText="전화번호"
                    source="/assets/icons/phone-icon.svg"
                    onChange={handlePhoneChange}
                />
                <InputDropdown
                    width="25%"
                    height="6em"
                    id="address"
                    value={address}
                    required
                    labelText="관심 지역"
                    itemList={addressList}
                    onChange={handleAddressChange}
                />
            </InputContainer>
            <ButtonWrapper>
                <TextButton type="submit" width="200px" text="개인정보 저장" />
            </ButtonWrapper>
        </SignUpContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const SignUpWithAuth = withAuth({ WrappedComponent: SignUp, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
SignUpWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SignUpWithAuth;
