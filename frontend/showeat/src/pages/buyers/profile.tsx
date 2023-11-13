/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import withAuth from "@libs/withAuth";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { patchNickname, patchPhone, patchAddress } from "@apis/users";
import useUserState from "@/hooks/useUserState";
import styled from "@emotion/styled";
import Image from "next/image";
import { TextButton } from "@components/common/button";
import { TextInput } from "@components/common/input";
import { InputDropdown } from "@components/common/dropdown";
import addressList from "@configs/addressList";
import { formatPhoneNumber } from "@utils/format";
// import FileInput from "@components/common/input/FileInput";

// ----------------------------------------------------------------------------------------------------
const UserInfoContainer = styled("div")`
    display: flex;
    flex-direction: column;
    font-size: 100px;
    margin-top: 70px;
    margin-left: 100px;
    gap: 40px;
    margin-bottom: 150px;
`;

const MyInfoContainer = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
`;

const MyImageContainer = styled("div")`
    display: flex;
    flex-direction: column;
`;

const ImageContainer = styled("div")`
    align-items: center;
    display: flex;
    flex-direction: column;
`;
const ButtonContainer = styled("div")`
    display: flex;
    gap: 10px;
    margin-top: 20px;
    text-align: center;
`;
const ProfileImage = styled(Image)`
    border-radius: 50%;
`;
const NickNameContainer = styled("div")`
    color: #000;
`;

const AddressContainer = styled("div")`
    color: #000;
`;
const PhoneContainer = styled("div")`
    color: #000;
`;
const MenuContainer = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 20px;
    text-align: left;
`;
const MenuWrapper = styled("div")`
    display: flex;
    gap: 10px;
`;

/* Buyer Profile Page */
function BuyerProfile() {
    const [user, setUser] = useUserState();
    const { userNickname, userAddress, userImgUrl, userPhone, userId } = user;
    const [nickname, setNickname] = useState<string>(userNickname);
    const [phone, setPhone] = useState<string>(userPhone);
    const [address, setAddress] = useState<string>(userAddress);
    // const [uploadedProfileFiles, setUploadedProfileFiles] = useState<File[]>([]);
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

    return (
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
                            text="수정"
                            width="100px"
                            height="40px"
                            fontSize={20}
                            colorType="primary"
                            onClick={() => {}}
                        />
                        {/* <FileInput
                            count={1}
                            color="primary"
                            id="menuImage"
                            buttonWidth="140px"
                            buttonHeight="40px"
                            buttonDescription="수정"
                            uploadedFiles={uploadedProfileFiles}
                            setUploadedFiles={setUploadedProfileFiles}
                            modifyProfile
                        /> */}
                        <TextButton
                            text="삭제"
                            width="100px"
                            height="40px"
                            fontSize={20}
                            colorType="primary"
                            onClick={() => {}}
                        />
                    </ButtonContainer>
                </ImageContainer>
            </MyImageContainer>
            <NickNameContainer>
                <MenuContainer>닉네임</MenuContainer>
                <MenuWrapper>
                    <TextInput
                        width="100%"
                        id="nickname"
                        value={nickname}
                        onChange={handleNicknameChange}
                    />
                    <TextButton
                        text="수정"
                        width="100px"
                        height="40px"
                        fontSize={20}
                        colorType="primary"
                        onClick={handleNicknameSubmit}
                    />
                </MenuWrapper>
            </NickNameContainer>
            <PhoneContainer>
                <MenuContainer>전화번호</MenuContainer>
                <MenuWrapper>
                    <TextInput
                        width="100%"
                        id="phone"
                        value={phone}
                        source="/assets/icons/phone-icon.svg"
                        onChange={handlePhoneChange}
                    />

                    <TextButton
                        text="수정"
                        width="100px"
                        height="40px"
                        fontSize={20}
                        colorType="primary"
                        onClick={handlePhoneSubmit}
                    />
                </MenuWrapper>
            </PhoneContainer>
            <AddressContainer>
                <MenuContainer>주소</MenuContainer>
                <MenuWrapper>
                    <InputDropdown
                        width="25%"
                        height="6em"
                        id="address"
                        value={address}
                        required
                        itemList={addressList}
                        onChange={handleAddressChange}
                    />
                    <TextButton
                        text="수정"
                        width="100px"
                        height="40px"
                        fontSize={20}
                        colorType="primary"
                        onClick={handleAddressSubmit}
                    />
                </MenuWrapper>
            </AddressContainer>
        </UserInfoContainer>
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
