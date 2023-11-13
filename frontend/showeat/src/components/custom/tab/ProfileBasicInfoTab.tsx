/* Import */
import { getBusinessRegiInfo } from "@apis/seller";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import useSellerState from "@hooks/useSellerState";

// ----------------------------------------------------------------------------------------------------

/* Style */
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

/* Profile Basic Information Tab Component */
function ProfileBasicInfoTab() {
    const [seller] = useSellerState();
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
        const { sellerId } = seller;

        if (sellerId !== 0) {
            getBusinessRegiInfo(sellerId).then((result) => {
                console.log(result.data);
                setBusinessRegiInfoState(result.data);
            });
        }
    }, [seller]);

    return (
        <BusinessRegiInfoContainer>
            <BusinessRegiDetailInfoContainer>
                <BusinessRegiDetailLeftContainer>
                    <BusinessRegiDetailInfoTitleWrapper>
                        상호 또는 법인명
                    </BusinessRegiDetailInfoTitleWrapper>
                    <BusinessRegiDetailInfoTitleWrapper>
                        사업자 등록 번호
                    </BusinessRegiDetailInfoTitleWrapper>
                    <BusinessRegiDetailInfoTitleWrapper>주소</BusinessRegiDetailInfoTitleWrapper>
                    <BusinessRegiDetailInfoTitleWrapper>연락처</BusinessRegiDetailInfoTitleWrapper>
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

export default ProfileBasicInfoTab;
