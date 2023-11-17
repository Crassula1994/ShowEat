/* Import */
import { AddMenuModal } from "@components/custom/modal";
import { deleteMenu, postMenu } from "@apis/menu";
import { FileInput, TextArea } from "@components/common/input";
import Image from "next/image";
import { BusinessType, MenuType } from "@customTypes/apiProps";
import Modal from "@components/composite/modal";
import {
    getSellerInfo,
    patchSellerBio,
    patchSellerOperatingTime,
    patchSellerClosedDays,
} from "@apis/seller";
import styled from "@emotion/styled";
import TextBox from "@components/common/textBox";
import { TextButton } from "@components/common/button";
import useSellerState from "@hooks/useSellerState";
import { useState, useEffect } from "react";

// ----------------------------------------------------------------------------------------------------

/* Style */
const SellerInfoContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    margin-top: 3em;
`;

const SubTitleWrapper = styled("div")`
    // Box Model Attribute
    width: 100%;
    margin-bottom: 0.5em;

    // Text Attribute
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: ${(props) => props.theme.colors.secondary3};
`;

const ProfileContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: 100%;
    min-width: 200px;
    gap: 1em;
`;

const Line = styled("div")`
    // Box Model Attribute
    width: 100%;
    height: 1px;
    margin: 3em 0;

    // Style Attribute
    border: none;
    background-color: ${(props) => props.theme.colors.gray2};
`;

const InfoContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: 70%;
    gap: 1em;
`;

const ButtonContainer = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    gap: 1em;
`;

const ProfileImage = styled(Image)`
    // Style Attribute
    border-radius: 50%;
    border: 3px solid ${(props) => props.theme.colors.secondary3};

    object-fit: cover;
`;

const SellerInfoMenuContentContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SellerInfoContentWrapper = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 40px; /* 200% */
    width: 500px;
`;

const DeleteIconWrapper = styled(Image)`
    cursor: pointer;
`;

// ----------------------------------------------------------------------------------------------------

/* Profile Seller Information Tab Component */
function ProfileSellerInfoTab() {
    // States and Variables
    const [seller] = useSellerState();
    const [isBioEditing, setIsBioEditing] = useState(false);
    const [isOperatingTimeEditing, setIsOperatingTimeEditing] = useState(false);
    const [isClosedDaysEditing, setIsClosedDaysEditing] = useState(false);
    const [isMenuEditing, setIsMenuEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedProfileFiles, setUploadedProfileFiles] = useState<File[]>([]);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [menuName, setMenuName] = useState("");
    const [originPrice, setOriginPrice] = useState("");
    const [sellerState, setSellerState] = useState<Partial<BusinessType>>({
        businessBio: "",
        businessClosedDays: "",
        businessId: seller.sellerId,
        businessImgUrl: seller.sellerImgUrl,
        businessOperatingTime: "",
        sellerMenuResponseDtos: [],
    });

    // Hooks for Loading Seller Information
    useEffect(() => {
        const { sellerId } = seller;
        if (sellerId !== 0) {
            getSellerInfo(sellerId).then((result) => {
                setSellerState(result.data);
            });
        }
    }, [seller]);

    const handleBusinessBioEdit = () => {
        setIsBioEditing(true);
    };

    const handleBusinessBioSave = () => {
        patchSellerBio(sellerState.businessBio as string).then((result) => {
            if (result.statusCode === 200) {
                setSellerState((prev) => ({
                    ...prev,
                    businessBio: sellerState.businessBio,
                }));
            }
        });

        setIsBioEditing(false);
    };

    const handleBusinessOperatingTimeEdit = () => {
        setIsOperatingTimeEditing(true);
    };

    const handleBusinessOperatingTimeSave = () => {
        patchSellerOperatingTime(sellerState.businessOperatingTime as string).then((result) => {
            if (result.statusCode === 200) {
                setSellerState((prev) => ({
                    ...prev,
                    businessOperatingTime: sellerState.businessOperatingTime,
                }));
            }
        });

        setIsOperatingTimeEditing(false);
    };

    const handleBusinessClosedDaysEdit = () => {
        setIsClosedDaysEditing(true);
    };

    const handleBusinessClosedDaysSave = () => {
        patchSellerClosedDays(sellerState.businessClosedDays as string).then((result) => {
            if (result.statusCode === 200) {
                setSellerState((prev) => ({
                    ...prev,
                    businessClosedDays: sellerState.businessClosedDays,
                }));
            }
        });

        setIsClosedDaysEditing(false);
    };

    const handleMenuEdit = () => {
        setIsMenuEditing(true);
    };

    const handleMenuSave = () => {
        setIsMenuEditing(false);
    };

    const submitModalData = () => {
        postMenu(menuName, originPrice, uploadedFiles).then((res) => {
            if (res.statusCode === 200) {
                const menuList: MenuType[] = [];

                res.data.forEach((item: MenuType) => {
                    const newItem = {
                        menuId: item.menuId,
                        menu: item.menu,
                    };

                    menuList.push(newItem);
                });

                setSellerState((prev) => ({
                    ...prev,
                    sellerMenuResponseDtos: menuList,
                }));
            }
            setIsModalOpen(false);
            setMenuName("");
            setOriginPrice("");
            setUploadedFiles([]);
        });
    };

    const deleteMenuMethod = (one: MenuType) => {
        deleteMenu(one.menuId.toString()).then((result) => {
            if (result.statusCode === 200) {
                const newMenus = sellerState.sellerMenuResponseDtos?.filter((oneMenu) => {
                    return oneMenu !== one;
                });

                setSellerState((prev) => ({
                    ...prev,
                    sellerMenuResponseDtos: newMenus,
                }));
            }
        });
    };

    return (
        <SellerInfoContainer>
            <SubTitleWrapper>프로필 이미지</SubTitleWrapper>
            <ProfileContainer>
                <ProfileImage
                    src={sellerState.businessImgUrl as string}
                    width={200}
                    height={200}
                    alt="seller-profile"
                    priority
                />
                <FileInput
                    count={1}
                    color="primary"
                    id="menuImage"
                    buttonWidth="140px"
                    buttonHeight="40px"
                    buttonDescription="수정"
                    uploadedFiles={uploadedProfileFiles}
                    setUploadedFiles={setUploadedProfileFiles}
                    modifyProfile
                    profileType="SELLER"
                />
            </ProfileContainer>
            <Line />
            <SubTitleWrapper>소개말</SubTitleWrapper>
            <InfoContainer>
                {isBioEditing ? (
                    <>
                        <TextArea
                            width="100%"
                            maxLength={200}
                            id="business-bio"
                            value={sellerState.businessBio as string}
                            onChange={(event) =>
                                setSellerState((prev) => ({
                                    ...prev,
                                    businessBio: event.target.value,
                                }))
                            }
                            fontSize="16px"
                        />
                        <TextButton
                            text="저장"
                            width="140px"
                            height="40px"
                            fontSize={20}
                            colorType="primary"
                            onClick={handleBusinessBioSave}
                        />
                    </>
                ) : (
                    <>
                        <TextBox text={sellerState.businessBio as string} />
                        <TextButton
                            text="수정"
                            width="140px"
                            height="40px"
                            fontSize={20}
                            colorType="primary"
                            onClick={handleBusinessBioEdit}
                        />
                    </>
                )}
            </InfoContainer>
            <Line />
            <SubTitleWrapper>운영 시간</SubTitleWrapper>
            <InfoContainer>
                {isOperatingTimeEditing ? (
                    <>
                        <TextArea
                            width="100%"
                            maxLength={200}
                            id="business-operating-time"
                            value={sellerState.businessOperatingTime as string}
                            onChange={(event) =>
                                setSellerState((prev) => ({
                                    ...prev,
                                    businessOperatingTime: event.target.value,
                                }))
                            }
                            fontSize="16px"
                        />
                        <TextButton
                            text="저장"
                            width="140px"
                            height="40px"
                            fontSize={20}
                            colorType="primary"
                            onClick={handleBusinessOperatingTimeSave}
                        />
                    </>
                ) : (
                    <>
                        <TextBox text={sellerState.businessOperatingTime as string} />
                        <TextButton
                            text="수정"
                            width="140px"
                            height="40px"
                            fontSize={20}
                            colorType="primary"
                            onClick={handleBusinessOperatingTimeEdit}
                        />
                    </>
                )}
            </InfoContainer>
            <Line />
            <SubTitleWrapper>휴무일</SubTitleWrapper>
            <InfoContainer>
                {isClosedDaysEditing ? (
                    <>
                        <TextArea
                            width="100%"
                            maxLength={200}
                            id="business-closed-days"
                            value={sellerState.businessClosedDays as string}
                            onChange={(event) =>
                                setSellerState((prev) => ({
                                    ...prev,
                                    businessClosedDays: event.target.value,
                                }))
                            }
                            fontSize="16px"
                        />
                        <TextButton
                            text="저장"
                            width="140px"
                            height="40px"
                            fontSize={20}
                            colorType="primary"
                            onClick={handleBusinessClosedDaysSave}
                        />
                    </>
                ) : (
                    <>
                        <TextBox text={sellerState.businessClosedDays as string} />
                        <TextButton
                            text="수정"
                            width="140px"
                            height="40px"
                            fontSize={20}
                            colorType="primary"
                            onClick={handleBusinessClosedDaysEdit}
                        />
                    </>
                )}
            </InfoContainer>
            <Line />
            <SubTitleWrapper>등록된 메뉴 목록</SubTitleWrapper>
            <InfoContainer>
                {isMenuEditing && sellerState.sellerMenuResponseDtos ? (
                    <>
                        {sellerState.sellerMenuResponseDtos.map((menu, index) => (
                            <SellerInfoMenuContentContainer key={`${menu}-${index}`}>
                                <SellerInfoContentWrapper key={index}>
                                    {menu.menu}
                                </SellerInfoContentWrapper>
                                <DeleteIconWrapper
                                    src="/assets/icons/delete-icon.svg"
                                    alt="delete-tag"
                                    width={15}
                                    height={15}
                                    onClick={() => deleteMenuMethod(menu)}
                                />
                            </SellerInfoMenuContentContainer>
                        ))}
                    </>
                ) : (
                    sellerState.sellerMenuResponseDtos?.map((menu, index) => (
                        <SellerInfoContentWrapper key={index}>
                            {menu.menu}{" "}
                        </SellerInfoContentWrapper>
                    ))
                )}
                {isMenuEditing ? (
                    <ButtonContainer>
                        <TextButton
                            text="추가"
                            width="140px"
                            height="40px"
                            fontSize={20}
                            colorType="primary"
                            onClick={() => setIsModalOpen(true)}
                        />
                        <TextButton
                            text="저장"
                            width="140px"
                            height="40px"
                            fontSize={20}
                            colorType="primary"
                            onClick={handleMenuSave}
                        />
                    </ButtonContainer>
                ) : (
                    <TextButton
                        text="수정"
                        width="140px"
                        height="40px"
                        fontSize={20}
                        colorType="primary"
                        onClick={handleMenuEdit}
                    />
                )}
            </InfoContainer>
            <Modal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                width="800px"
                height="500px"
                buttonType="submit"
                buttonWidth="200px"
                buttonHeight="50px"
                buttonFontSize={20}
                childComponent={AddMenuModal({
                    menuName,
                    setMenuName,
                    originPrice,
                    setOriginPrice,
                    uploadedFiles,
                    setUploadedFiles,
                })}
                onSubmit={submitModalData}
            />
        </SellerInfoContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ProfileSellerInfoTab;
