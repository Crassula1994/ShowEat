/* Import */
import { BusinessType } from "@customTypes/apiProps";
import { formatBusinessNumber, formatPhoneNumber } from "@utils/format";
import { getBusinessRegiInfo } from "@apis/seller";
import styled from "@emotion/styled";
import Table from "@components/common/table";
import { useEffect, useState } from "react";
import useSellerState from "@hooks/useSellerState";

// ----------------------------------------------------------------------------------------------------

/* Style */
const BasicInfoContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;

    // Box Model Attribute
    margin-top: 5em;
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

const Line = styled("div")`
    // Box Model Attribute
    width: 100%;
    height: 1px;
    margin: 5em 0;

    // Style Attribute
    border: none;
    background-color: ${(props) => props.theme.colors.gray2};
`;

// ----------------------------------------------------------------------------------------------------

/* Profile Basic Information Tab Component */
function ProfileBasicInfoTab() {
    const [seller] = useSellerState();
    const [businessData, setBusinessData] = useState<Partial<BusinessType>>({
        businessName: "",
        businessNumber: "",
        businessAddress: "",
        businessPhone: "",
        businessCeo: "",
        businessEmail: "",
        businessAccountHolder: "",
        businessAccount: "",
    });
    const representativeInfo: string[] = [
        businessData.businessCeo as string,
        businessData.businessEmail as string,
    ];
    const businessInfo: string[] = [
        businessData.businessName as string,
        formatBusinessNumber(businessData.businessNumber as string),
        businessData.businessAddress as string,
        formatPhoneNumber(businessData.businessPhone as string),
    ];
    const accountInfo: string[] = [
        businessData.businessAccountHolder as string,
        businessData.businessAccount as string,
    ];

    // Hooks for Getting Profile Basic Information
    useEffect(() => {
        const { sellerId } = seller;

        if (sellerId !== 0) {
            getBusinessRegiInfo(sellerId).then((result) => {
                setBusinessData(result.data);
            });
        }
    }, [seller]);

    return (
        <BasicInfoContainer>
            <SubTitleWrapper>대표자 정보</SubTitleWrapper>
            <Table
                headerWidth="30%"
                headers={["대표자명", "대표자 이메일"]}
                contents={representativeInfo}
            />
            <Line />
            <SubTitleWrapper>사업자 정보</SubTitleWrapper>
            <Table
                headerWidth="30%"
                headers={["상호/법인명", "사업자 등록번호", "주소", "연락처"]}
                contents={businessInfo}
            />
            <Line />
            <SubTitleWrapper>정산 정보</SubTitleWrapper>
            <Table headerWidth="30%" headers={["예금주명", "계좌 정보"]} contents={accountInfo} />
        </BasicInfoContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ProfileBasicInfoTab;
