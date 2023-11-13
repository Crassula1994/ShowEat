/* Import */
import { ChangeEvent, SetStateAction, ReactNode, useState, useEffect } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import useSellerState from "@hooks/useSellerState";
import { TextButton } from "@components/common/button";
import {
    getSellerInfo,
    patchSellerBio,
    patchSellerOperatingTime,
    patchSellerClosedDays,
} from "@apis/seller";
import { TextArea, TextInput } from "@components/common/input";
import FileInput from "@components/common/input/FileInput";
import Modal from "@components/composite/modal";
import { addNewMenu, deleteMenu } from "@apis/menu";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface ModalDataType {
    menuName: string;
    setMenuName: React.Dispatch<SetStateAction<string>>;
    originPrice: string;
    setOriginPrice: React.Dispatch<SetStateAction<string>>;
    uploadedFiles: File[];
    setUploadedFiles: React.Dispatch<SetStateAction<File[]>>;
}

const SellerInfoContainer = styled("div")`
    display: flex;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    min-height: 1000px;
    flex-direction: column;
    flex-shrink: 0;
`;

const SellerInfoContentContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 6%;
    margin-top: 3%;
    gap: 100px;
`;

const SellerDetailInfoContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 25px;
`;

const SellerProfileImageTitleWrapper = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 60px; /* 250% */
`;

const SellerProfileImageChangeContainer = styled("div")`
    display: flex;
    width: 300px;
    align-items: flex-end;
    gap: 28px;
`;

const ChangeSellerProfileImageWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfileImageWrapper = styled("div")`
    position: relative;
    width: 120px;
    height: 120px;

    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 50%;
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
`;

const SellerInfoTitleContainer = styled("div")`
    display: flex;
    align-items: center;
    gap: 25px;
`;

const SellerInfoTitleWrapper = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 60px; /* 250% */
`;

const ChangeSellerInfoWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
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

/* ------------------ 메뉴 모달 ----------------- */
const ModalContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const ModalTitleWrapper = styled("span")`
    font-size: 26px;
    font-weight: 700;

    padding-bottom: 1em;
`;

const ModalContentContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ModalInputContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 670px;
    height: 50px;
`;

const ModalFileInputContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    /* align-items: center; */

    width: 670px;
    height: 180px;

    padding-top: 0.5em;
`;

const InputTitleWrapper = styled("label")`
    font-size: 18px;
    font-weight: 700;

    width: 100px;
`;

const FileInputTitleWrapper = styled("label")`
    font-size: 18px;
    font-weight: 700;

    width: 100px;

    padding-top: 0.4em;
`;

const InputWrapper = styled("div")`
    width: 550px;
`;

const FileInputWrapper = styled("div")`
    width: 550px;
`;

/* Add Menu Modal Component */
function AddMenu({
    menuName,
    setMenuName,
    originPrice,
    setOriginPrice,
    uploadedFiles,
    setUploadedFiles,
}: ModalDataType): ReactNode {
    const changeMenuName = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setMenuName(newValue);
    };

    const changeOriginPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d+$/.test(newValue) || newValue === "") {
            setOriginPrice(newValue);
        }
    };

    return (
        <ModalContainer>
            <ModalTitleWrapper>메뉴 추가</ModalTitleWrapper>
            <ModalContentContainer>
                <ModalInputContainer>
                    <InputTitleWrapper htmlFor="menuName">메뉴 이름</InputTitleWrapper>
                    <InputWrapper>
                        <TextInput
                            value={menuName}
                            width="543px"
                            id="menuName"
                            onChange={changeMenuName}
                        />
                    </InputWrapper>
                </ModalInputContainer>
                <ModalInputContainer>
                    <InputTitleWrapper htmlFor="originPrice">메뉴 원가</InputTitleWrapper>
                    <InputWrapper>
                        <TextInput
                            value={originPrice}
                            width="543px"
                            id="originPrice"
                            onChange={changeOriginPrice}
                            unit="원"
                        />
                    </InputWrapper>
                </ModalInputContainer>
                <ModalFileInputContainer>
                    <FileInputTitleWrapper htmlFor="menuImage">메뉴 사진</FileInputTitleWrapper>
                    <FileInputWrapper>
                        <FileInput
                            count={5}
                            color="primary"
                            id="menuImage"
                            buttonWidth="150px"
                            buttonHeight="40px"
                            buttonDescription="추가"
                            uploadedFiles={uploadedFiles}
                            setUploadedFiles={setUploadedFiles}
                        />
                    </FileInputWrapper>
                </ModalFileInputContainer>
            </ModalContentContainer>
        </ModalContainer>
    );
}

/* Profile Seller Information Tab Component */
function ProfileSellerInfoTab() {
    // 현재 활성화된 탭을 추적하는 state
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
    const [sellerState, setSellerState] = useState({
        businessBio: "",
        businessClosedDays: "",
        businessId: seller.sellerId,
        businessImgUrl: seller.sellerImgUrl,
        businessOperatingTime: "",
        sellerMenuResponseDtos: [],
    });

    useEffect(() => {
        const { sellerId } = seller;
        if (sellerId !== 0) {
            getSellerInfo(sellerId).then((result) => {
                console.log(result.data);
                setSellerState(result.data);
            });
        }
    }, [seller]);

    // 수정 모드로 전환
    const handleBusinessBioEdit = () => {
        setIsBioEditing(true);
    };

    const handleBusinessBioSave = () => {
        patchSellerBio(sellerState.businessBio).then((result) => {
            if (result.statusCode === 200) {
                setSellerState((prev) => ({
                    ...prev,
                    businessBio: sellerState.businessBio,
                }));
            }
        });

        setIsBioEditing(false); // 수정 모드 종료
    };

    const handleBusinessOperatingTimeEdit = () => {
        setIsOperatingTimeEditing(true);
    };

    const handleBusinessOperatingTimeSave = () => {
        patchSellerOperatingTime(sellerState.businessOperatingTime).then((result) => {
            if (result.statusCode === 200) {
                setSellerState((prev) => ({
                    ...prev,
                    businessOperatingTime: sellerState.businessOperatingTime,
                }));
            }
        });

        setIsOperatingTimeEditing(false); // 수정 모드 종료
    };

    const handleBusinessClosedDaysEdit = () => {
        setIsClosedDaysEditing(true);
    };

    const handleBusinessClosedDaysSave = () => {
        patchSellerClosedDays(sellerState.businessClosedDays).then((result) => {
            if (result.statusCode === 200) {
                setSellerState((prev) => ({
                    ...prev,
                    businessClosedDays: sellerState.businessClosedDays,
                }));
            }
        });

        setIsClosedDaysEditing(false); // 수정 모드 종료
    };

    const handleMenuEdit = () => {
        setIsMenuEditing(true);
    };

    const handleMenuSave = () => {
        setIsMenuEditing(false); // 수정 모드 종료
    };

    const submitModalData = () => {
        addNewMenu({
            menu: menuName,
            price: originPrice,
            multipartFiles: uploadedFiles,
        }).then((res) => {
            if (res.statusCode === 200) {
                const menuList = [];

                res.data.forEach((item) => {
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
        });
    };

    const deleteMenuMethod = (one: string) => {
        deleteMenu(one.menuId).then((result) => {
            if (result.statusCode === 200) {
                const newMenus = sellerState.sellerMenuResponseDtos.filter((oneMenu) => {
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
            <SellerInfoContentContainer>
                <SellerDetailInfoContainer>
                    <SellerProfileImageTitleWrapper>
                        셀러 프로필 사진
                    </SellerProfileImageTitleWrapper>
                    <SellerProfileImageChangeContainer>
                        <ProfileImageWrapper>
                            <ProfileImage src={sellerState.businessImgUrl} alt="profile-img" fill />
                        </ProfileImageWrapper>
                        <ChangeSellerProfileImageWrapper>
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
                            />
                        </ChangeSellerProfileImageWrapper>
                    </SellerProfileImageChangeContainer>
                </SellerDetailInfoContainer>

                <SellerDetailInfoContainer>
                    <SellerInfoTitleContainer>
                        <SellerInfoTitleWrapper>셀러 소개문</SellerInfoTitleWrapper>
                        <ChangeSellerInfoWrapper>
                            {isBioEditing ? (
                                <TextButton
                                    text="저장"
                                    width="140px"
                                    height="40px"
                                    fontSize={20}
                                    colorType="primary"
                                    onClick={handleBusinessBioSave}
                                />
                            ) : (
                                <TextButton
                                    text="수정"
                                    width="140px"
                                    height="40px"
                                    fontSize={20}
                                    colorType="primary"
                                    onClick={handleBusinessBioEdit}
                                />
                            )}
                        </ChangeSellerInfoWrapper>
                    </SellerInfoTitleContainer>

                    {isBioEditing ? (
                        <TextArea
                            maxLength={200}
                            setTextValue={() => setSellerState(sellerState)}
                            fontSize="16px"
                            labelFontSize="14px"
                            error={false}
                        />
                    ) : (
                        <SellerInfoContentWrapper>
                            {sellerState.businessBio}
                        </SellerInfoContentWrapper>
                    )}
                </SellerDetailInfoContainer>

                <SellerDetailInfoContainer>
                    <SellerInfoTitleContainer>
                        <SellerInfoTitleWrapper>셀러 운영 시간</SellerInfoTitleWrapper>
                        <ChangeSellerInfoWrapper>
                            {isOperatingTimeEditing ? (
                                <TextButton
                                    text="저장"
                                    width="140px"
                                    height="40px"
                                    fontSize={20}
                                    colorType="primary"
                                    onClick={handleBusinessOperatingTimeSave}
                                />
                            ) : (
                                <TextButton
                                    text="수정"
                                    width="140px"
                                    height="40px"
                                    fontSize={20}
                                    colorType="primary"
                                    onClick={handleBusinessOperatingTimeEdit}
                                />
                            )}
                        </ChangeSellerInfoWrapper>
                    </SellerInfoTitleContainer>
                    {isOperatingTimeEditing ? (
                        <TextArea
                            maxLength={200}
                            setTextValue={setBusinessOperatingTime}
                            fontSize="16px"
                            labelFontSize="14px"
                            error={false}
                        />
                    ) : (
                        <SellerInfoContentWrapper>
                            {sellerState.businessOperatingTime}
                        </SellerInfoContentWrapper>
                    )}
                </SellerDetailInfoContainer>

                <SellerDetailInfoContainer>
                    <SellerInfoTitleContainer>
                        <SellerInfoTitleWrapper>셀러 휴무일 정보</SellerInfoTitleWrapper>
                        <ChangeSellerInfoWrapper>
                            {isClosedDaysEditing ? (
                                <TextButton
                                    text="저장"
                                    width="140px"
                                    height="40px"
                                    fontSize={20}
                                    colorType="primary"
                                    onClick={handleBusinessClosedDaysSave}
                                />
                            ) : (
                                <TextButton
                                    text="수정"
                                    width="140px"
                                    height="40px"
                                    fontSize={20}
                                    colorType="primary"
                                    onClick={handleBusinessClosedDaysEdit}
                                />
                            )}
                        </ChangeSellerInfoWrapper>
                    </SellerInfoTitleContainer>
                    {isClosedDaysEditing ? (
                        <TextArea
                            maxLength={200}
                            setTextValue={setBusinessClosedDays}
                            fontSize="16px"
                            labelFontSize="14px"
                            error={false}
                        />
                    ) : (
                        <SellerInfoContentWrapper>
                            {sellerState.businessClosedDays}
                        </SellerInfoContentWrapper>
                    )}
                </SellerDetailInfoContainer>

                <SellerDetailInfoContainer>
                    <SellerInfoTitleContainer>
                        <SellerInfoTitleWrapper>셀러 메뉴 정보</SellerInfoTitleWrapper>
                        <ChangeSellerInfoWrapper>
                            {isMenuEditing ? (
                                <>
                                    <TextButton
                                        text="추가"
                                        width="140px"
                                        height="40px"
                                        fontSize={20}
                                        colorType="primary"
                                        onClick={() => setIsModalOpen(true)}
                                    />
                                    <span style={{ display: "inline-block", width: "10px" }} />
                                    <TextButton
                                        text="저장"
                                        width="140px"
                                        height="40px"
                                        fontSize={20}
                                        colorType="primary"
                                        onClick={handleMenuSave}
                                    />
                                </>
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
                        </ChangeSellerInfoWrapper>
                    </SellerInfoTitleContainer>
                    {isMenuEditing ? (
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
                        <>
                            {sellerState.sellerMenuResponseDtos.map((menu, index) => (
                                <SellerInfoContentWrapper key={index}>
                                    {menu.menu}{" "}
                                </SellerInfoContentWrapper>
                            ))}
                        </>
                    )}
                </SellerDetailInfoContainer>
            </SellerInfoContentContainer>
            <Modal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                width="800px"
                height="500px"
                buttonType="submit"
                buttonWidth="200px"
                buttonHeight="50px"
                buttonFontSize={20}
                childComponent={AddMenu({
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
