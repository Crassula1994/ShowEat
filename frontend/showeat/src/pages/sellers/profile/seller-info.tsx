/* Import */
import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode, useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import useSellerState from "@/hooks/useSellerState";
import { TextButton } from "@components/common/button";
import {
    getSellerInfo,
    getBusinessRegiInfo,
    pathSellerBio,
    pathSellerOperatingTime,
    pathSellerClosedDays,
} from "@/apis/seller";
import { TextArea } from "@/components/common/input";
import FileInput from "@components/common/input/FileInput";
// ----------------------------------------------------------------------------------------------------

const SellerInfoContainer = styled("div")`
    display: flex;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    min-height: 1000px;
    flex-direction: column;
    flex-shrink: 0;
`;

const SellerInfoTabWrapper = styled("div")`
    width: 360px;
    height: 80px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 5%;
    margin-top: 5%;
`;

const SellerInfoTabContainer = styled("span")`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    /* 활성 탭 스타일 */
    &.active {
        font-weight: 700; /* 글씨 굵기 */
        font-size: 28px; /* 글씨 크기를 증가 */
        text-decoration: underline; /* 밑줄 추가 */
    }
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

const SellerInfoContentWrapper = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 40px; /* 200% */
    width: 500px;
`;
/* -----------------------------  사업자 등록 정보    --------------------------------- */

const BusinessRegiInfoContainer = styled("div")`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 6%;
    margin-top: 3%;
`;

const BusinessRegiAccountInfoContainer = styled("div")`
    display: flex;
    width: 800px;
    flex-direction: column;
    align-items: center;
    gap: 40px;
`;

const BusinessRegiTitleWrapper = styled("div")`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const BusinessRegiDetailInfoContainer = styled("div")`
    display: flex;
    width: 800px;
    align-items: flex-start;
    gap: 30px;
`;

const BusinessRegiDetailLeftContainer = styled("div")`
    display: flex;
    width: 180px;
    height: 209px;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    flex-shrink: 0;
`;

const BusinessRegiDetailRightContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`;

const BusinessRegiDetailInfoTitleWrapper = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const BusinessRegiDetailInfoContentWrapper = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`;

/* Seller Info Page */
function SellerInfo() {
    // 현재 활성화된 탭을 추적하는 state
    const [seller] = useSellerState();
    const [activeTab, setActiveTab] = useState("seller");
    const [isBioEditing, setIsBioEditing] = useState(false);
    const [isOperatingTimeEditing, setIsOperatingTimeEditing] = useState(false);
    const [isClosedDaysEditing, setIsClosedDaysEditing] = useState(false);

    const [businessBio, setBusinessBio] = useState("");
    const [businessOperatingTime, setBusinessOperatingTime] = useState("");
    const [businessClosedDays, setBusinessClosedDays] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    const [sellerState, setSellerState] = useState({
        businessBio: "ㅋ",
        businessClosedDays: "ㅋㅋ",
        businessImgUrl: "",
        businessId: "1",
        businessOperatingTime: "ㅋㅋㅋㅋ",
        sellerMenuResponseDtos: [],
    });

    const [businessRegiInfoState, setBusinessRegiInfoState] = useState({
        businessName: "aa",
        businessNumber: "bb",
        businessAddress: "cc",
        businessPhone: "dd",
        businessCeo: "ee",
        businessEmail: "ff",
        businessAccountHolder: "gg",
        businessAccount: "hh",
    });

    useEffect(() => {
        // const { sellerId } = seller;
        const sellerId = 1;
        if (sellerId !== 0) {
            getSellerInfo(sellerId).then((result) => {
                console.log(result.data);
                setSellerState(result.data);
            });
        }
    }, []);

    useEffect(() => {
        // const { sellerId } = seller;
        const sellerId = 1;
        if (sellerId !== 0) {
            getBusinessRegiInfo(sellerId).then((result) => {
                console.log(result.data);
                setBusinessRegiInfoState(result.data);
            });
        }
    }, []);

    // 수정 모드로 전환
    const handleBusinessBioEdit = () => {
        setIsBioEditing(true);
    };

    const handleBusinessBioSave = () => {
        pathSellerBio(businessBio).then((result) => {
            if (result.statusCode === 200) {
                setSellerState((prev) => ({
                    ...prev,
                    businessBio,
                }));
            }
        });

        setIsBioEditing(false); // 수정 모드 종료
    };

    const handleBusinessOperatingTimeEdit = () => {
        setIsOperatingTimeEditing(true);
    };

    const handleBusinessOperatingTimeSave = () => {
        pathSellerOperatingTime(businessOperatingTime).then((result) => {
            if (result.statusCode === 200) {
                setSellerState((prev) => ({
                    ...prev,
                    businessOperatingTime,
                }));
            }
        });

        setIsOperatingTimeEditing(false); // 수정 모드 종료
    };

    const handleBusinessClosedDaysEdit = () => {
        setIsClosedDaysEditing(true);
    };

    const handleBusinessClosedDaysSave = () => {
        pathSellerClosedDays(businessClosedDays).then((result) => {
            if (result.statusCode === 200) {
                setSellerState((prev) => ({
                    ...prev,
                    businessClosedDays,
                }));
            }
        });

        setIsClosedDaysEditing(false); // 수정 모드 종료
    };

    const handleFileSave = () => {};

    let content;
    if (activeTab === "seller") {
        content = (
            <SellerInfoContentContainer>
                <SellerDetailInfoContainer>
                    <SellerProfileImageTitleWrapper>
                        셀러 프로필 사진
                    </SellerProfileImageTitleWrapper>
                    <SellerProfileImageChangeContainer>
                        <ProfileImageWrapper>
                            <ProfileImage src={seller.sellerImgUrl} alt="profile-img" fill />
                        </ProfileImageWrapper>
                        <ChangeSellerProfileImageWrapper>
                            {/* <TextButton
                                text="사진 변경"
                                width="140px"
                                height="40px"
                                fontSize={20}
                                colorType="primary"
                                onClick={handleFileSave}
                            /> */}
                            <FileInput
                                count={1}
                                color="primary"
                                id="menuImage"
                                buttonWidth="140px"
                                buttonHeight="40px"
                                buttonDescription="수정"
                                uploadedFiles={uploadedFiles}
                                setUploadedFiles={setUploadedFiles}
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
                            setTextValue={setBusinessBio}
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
                            <TextButton
                                text="수정"
                                width="140px"
                                height="40px"
                                fontSize={20}
                                colorType="primary"
                                // onClick={handleCreateFunding}
                            />
                        </ChangeSellerInfoWrapper>
                    </SellerInfoTitleContainer>
                    <SellerInfoContentWrapper>메뉴 정보</SellerInfoContentWrapper>
                </SellerDetailInfoContainer>
            </SellerInfoContentContainer>
        );
    } else if (activeTab === "business") {
        content = (
            <BusinessRegiInfoContainer>
                <BusinessRegiDetailInfoContainer>
                    <BusinessRegiDetailLeftContainer>
                        <BusinessRegiDetailInfoTitleWrapper>
                            상호 또는 법인명
                        </BusinessRegiDetailInfoTitleWrapper>
                        <BusinessRegiDetailInfoTitleWrapper>
                            사업자 등록 번호
                        </BusinessRegiDetailInfoTitleWrapper>
                        <BusinessRegiDetailInfoTitleWrapper>
                            주소
                        </BusinessRegiDetailInfoTitleWrapper>
                        <BusinessRegiDetailInfoTitleWrapper>
                            연락처
                        </BusinessRegiDetailInfoTitleWrapper>
                    </BusinessRegiDetailLeftContainer>
                    <BusinessRegiDetailRightContainer>
                        <BusinessRegiDetailInfoContentWrapper>
                            {businessRegiInfoState.businessName}
                        </BusinessRegiDetailInfoContentWrapper>
                        <BusinessRegiDetailInfoContentWrapper>
                            {businessRegiInfoState.businessNumber}
                        </BusinessRegiDetailInfoContentWrapper>
                        <BusinessRegiDetailInfoContentWrapper>
                            {businessRegiInfoState.businessAddress}
                        </BusinessRegiDetailInfoContentWrapper>
                        <BusinessRegiDetailInfoContentWrapper>
                            {businessRegiInfoState.businessPhone}
                        </BusinessRegiDetailInfoContentWrapper>
                    </BusinessRegiDetailRightContainer>
                </BusinessRegiDetailInfoContainer>

                <BusinessRegiAccountInfoContainer>
                    <BusinessRegiTitleWrapper>대표자 정보</BusinessRegiTitleWrapper>
                    <BusinessRegiDetailInfoContainer>
                        <BusinessRegiDetailLeftContainer>
                            <BusinessRegiDetailInfoTitleWrapper>
                                대표자명
                            </BusinessRegiDetailInfoTitleWrapper>
                            <BusinessRegiDetailInfoTitleWrapper>
                                대표자 이메일
                            </BusinessRegiDetailInfoTitleWrapper>
                        </BusinessRegiDetailLeftContainer>
                        <BusinessRegiDetailRightContainer>
                            <BusinessRegiDetailInfoContentWrapper>
                                {businessRegiInfoState.businessCeo}
                            </BusinessRegiDetailInfoContentWrapper>
                            <BusinessRegiDetailInfoContentWrapper>
                                {businessRegiInfoState.businessEmail}
                            </BusinessRegiDetailInfoContentWrapper>
                        </BusinessRegiDetailRightContainer>
                    </BusinessRegiDetailInfoContainer>
                </BusinessRegiAccountInfoContainer>

                <BusinessRegiAccountInfoContainer>
                    <BusinessRegiTitleWrapper>정산 정보</BusinessRegiTitleWrapper>
                    <BusinessRegiDetailInfoContainer>
                        <BusinessRegiDetailLeftContainer>
                            <BusinessRegiDetailInfoTitleWrapper>
                                예금주명
                            </BusinessRegiDetailInfoTitleWrapper>
                            <BusinessRegiDetailInfoTitleWrapper>
                                계좌정보
                            </BusinessRegiDetailInfoTitleWrapper>
                        </BusinessRegiDetailLeftContainer>
                        <BusinessRegiDetailRightContainer>
                            <BusinessRegiDetailInfoContentWrapper>
                                {businessRegiInfoState.businessAccountHolder}
                            </BusinessRegiDetailInfoContentWrapper>
                            <BusinessRegiDetailInfoContentWrapper>
                                {businessRegiInfoState.businessAccount}
                            </BusinessRegiDetailInfoContentWrapper>
                        </BusinessRegiDetailRightContainer>
                    </BusinessRegiDetailInfoContainer>
                </BusinessRegiAccountInfoContainer>
            </BusinessRegiInfoContainer>
        );
    }

    return (
        <SellerInfoContainer>
            <SellerInfoTabWrapper>
                <SellerInfoTabContainer
                    className={activeTab === "seller" ? "active" : ""}
                    onClick={() => setActiveTab("seller")}
                >
                    셀러 정보
                </SellerInfoTabContainer>
                <SellerInfoTabContainer
                    className={activeTab === "business" ? "active" : ""}
                    onClick={() => setActiveTab("business")}
                >
                    사업자 등록 정보
                </SellerInfoTabContainer>
            </SellerInfoTabWrapper>
            {content}
        </SellerInfoContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const SellerInfoWithAuth = withAuth({
    WrappedComponent: SellerInfo,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
SellerInfoWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SellerInfoWithAuth;
