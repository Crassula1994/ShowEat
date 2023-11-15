/* Import */
import addressList from "@configs/addressList";
import BuyerLayout from "@layouts/BuyerLayout";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { FileInput, TextInput } from "@components/common/input";
import { formatPhoneNumber } from "@utils/format";
import { patchAddress, patchDeleteUserProfile, patchNickname, patchPhone } from "@apis/users";
import styled from "@emotion/styled";
import Image from "next/image";
import { TextButton } from "@components/common/button";
import { InputDropdown } from "@components/common/dropdown";
import useUserState from "@hooks/useUserState";
import withAuth from "@libs/withAuth";
import Head from "next/head";

// ----------------------------------------------------------------------------------------------------

/* Style */
const UserInfoContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5em;

    // Box Model Attribute
    width: 100%;
    box-sizing: border-box;
    padding: 5em 10em;
`;

const MyInfoContainer = styled("div")`
    font-size: 30px;
    font-weight: 900;
`;

const MyImageContainer = styled("div")`
    display: flex;
    flex-direction: column;
`;

const ImageContainer = styled("div")`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled("div")`
    display: flex;
    gap: 10px;
    margin-top: 2em;
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
`;

const NickNameContainer = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: flex-end;
    gap: 1em;

    // Box Model Attribute
    width: 50%;
`;

const PhoneContainer = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: flex-end;
    gap: 1em;

    // Box Model Attribute
    width: 50%;
`;

const AddressContainer = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: flex-end;
    gap: 1em;

    // Box Model Attribute
    width: 50%;
`;

const DropdownWrapper = styled("div")`
    width: 70%;
`;

const MenuContainer = styled("div")`
    font-size: 18px;
    font-weight: 700;
    padding-bottom: 20px;
    text-align: left;
`;

// ----------------------------------------------------------------------------------------------------

/* Buyer Profile Page */
function BuyerProfile() {
    const [user, setUser] = useUserState();
    const { userNickname, userAddress, userImgUrl, userPhone, userId } = user;
    const [nickname, setNickname] = useState<string>(userNickname);
    const [phone, setPhone] = useState<string>(userPhone);
    const [address, setAddress] = useState<string>(userAddress);
    const [uploadedProfileFiles, setUploadedProfileFiles] = useState<File[]>([]);

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

    useEffect(() => {
        if (userId !== 0) {
            setNickname(userNickname);
            setPhone(formatPhoneNumber(userPhone));
            setAddress(userAddress);
        }
    }, [user]);

    const handleNicknameSubmit = () => {
        patchNickname(user.userId, nickname).then(() => {
            setUser((prevState) => ({
                ...prevState,
                userNickname: nickname,
            }));
        });
    };

    const handlePhoneSubmit = () => {
        const rawPhone = phone.replace(/-/g, "");
        patchPhone(user.userId, rawPhone).then(() => {
            setUser((prevState) => ({
                ...prevState,
                userPhone: phone,
            }));
        });
    };

    const handleAddressSubmit = () => {
        patchAddress(user.userId, address).then(() => {
            setUser((prevState) => ({
                ...prevState,
                userAddress: address,
            }));
        });
    };

    const handleDeleteProfile = () => {
        patchDeleteUserProfile(user.userId).then(() => {
            setUser((prevState) => ({
                ...prevState,
                userImgUrl:
                    "https://showeatbucket.s3.ap-northeast-2.amazonaws.com/user/basic-profile.png",
            }));
        });
    };

    return (
        <>
            <Head>
                <title>내 정보</title>
                <meta name="description" content="바이어 님의 정보 페이지입니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <UserInfoContainer>
                <MyInfoContainer>나의 정보</MyInfoContainer>
                <MyImageContainer>
                    <MenuContainer>프로필 사진</MenuContainer>
                    <ImageContainer>
                        <ProfileImage
                            src={userImgUrl}
                            width={150}
                            height={150}
                            alt="crying-cook-cow"
                            priority
                        />
                        <ButtonContainer>
                            <TextButton
                                text="삭제"
                                width="100px"
                                height="40px"
                                fontSize={20}
                                colorType="primary"
                                onClick={handleDeleteProfile}
                            />
                            <FileInput
                                count={1}
                                color="primary"
                                id="menuImage"
                                buttonWidth="100px"
                                buttonHeight="40px"
                                buttonDescription="수정"
                                uploadedFiles={uploadedProfileFiles}
                                setUploadedFiles={setUploadedProfileFiles}
                                modifyProfile
                                profileType="BUYER"
                                userId={user.userId}
                            />
                        </ButtonContainer>
                    </ImageContainer>
                </MyImageContainer>
                <NickNameContainer>
                    <TextInput
                        width="70%"
                        id="nickname"
                        value={nickname}
                        labelText="닉네임"
                        onChange={handleNicknameChange}
                    />
                    <TextButton
                        text="수정"
                        width="20%"
                        height="40px"
                        fontSize={20}
                        colorType="primary"
                        onClick={handleNicknameSubmit}
                    />
                </NickNameContainer>
                <PhoneContainer>
                    <TextInput
                        width="70%"
                        id="phone"
                        value={phone}
                        labelText="전화번호"
                        source="/assets/icons/phone-icon.svg"
                        onChange={handlePhoneChange}
                    />
                    <TextButton
                        text="수정"
                        width="20%"
                        height="40px"
                        fontSize={20}
                        colorType="primary"
                        onClick={handlePhoneSubmit}
                    />
                </PhoneContainer>
                <AddressContainer>
                    <DropdownWrapper>
                        <InputDropdown
                            width="20%"
                            height="6em"
                            id="address"
                            value={address}
                            required
                            labelText="주소"
                            itemList={addressList}
                            onChange={handleAddressChange}
                        />
                    </DropdownWrapper>
                    <TextButton
                        text="수정"
                        width="20%"
                        height="40px"
                        fontSize={20}
                        colorType="primary"
                        onClick={handleAddressSubmit}
                    />
                </AddressContainer>
            </UserInfoContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const BuyerProfileWithAuth = withAuth({
    WrappedComponent: BuyerProfile,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
BuyerProfileWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default BuyerProfileWithAuth;
