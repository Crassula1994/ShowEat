import styled from "@emotion/styled";
import withAuth from "@libs/withAuth";
import SingleLayout from "@layouts/SingleLayout";
import { ReactNode, ChangeEvent, useState } from "react";
import TextButton from "@components/common/button/TextButton";
import { useRouter } from "next/router";
import { postBusinessInfo } from "@apis/business";
import SellerInfo from "./seller-info";
import OwnerInfo from "./owner-info";

interface StepBoxProps {
    backgroundColor: string;
}

const HeaderContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin: 100px;
`;

const HeaderWrapper = styled("div")`
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    width: 800px;
    height: 60px;
`;

const ProgressBox = styled("div")`
    display: flex;
    width: 400px;
    justify-content: space-between;
    align-items: center;
`;

const StepBox = styled("div")<StepBoxProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${(props) => props.backgroundColor};
`;

const StepLine = styled.div`
    width: 100px;
    height: 1px;
    flex-shrink: 0;
    border-radius: 2px;
    background-color: black;
`;

const ResultBox = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 80px;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
`;

function Registration() {
    const router = useRouter();
    const [ceo, setCeo] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [businessName, setBusinessName] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [businessNumber, setBusinessNumber] = useState<string>("");
    const [businessAddress, setBusinessAddress] = useState<string>("");
    const [zonecode, setZonecode] = useState<string>("");
    const [businessAddressDetail, setBusinessAddressDetail] = useState<string>("");
    const [businessPhone, setBusinessPhone] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [formData, setFormData] = useState<FormData>(new FormData());

    const handleCeoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCeo(event.target.value.trim());
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value.trim());
    };

    const handleBusinessNameChange = (value: string) => {
        setBusinessName(value);
    };

    const handleStartDateChange = (value: string) => {
        setStartDate(value);
    };

    const handleBusinessNumberChange = (value: string) => {
        setBusinessNumber(value);
    };

    const handleBusinessAddressChange = (value: string) => {
        setBusinessAddress(value);
    };

    const handleZonecodeChange = (value: string) => {
        setZonecode(value);
    };

    const handleBusinessAddressDetailChange = (value: string) => {
        setBusinessAddressDetail(value);
    };

    const handleBusinessPhoneChange = (value: string) => {
        setBusinessPhone(value);
    };

    const handleFileNameChange = (value: string) => {
        setFileName(value);
    };

    const handleFormDataChange = (value: FormData) => {
        setFormData(value);
    };

    const handleButtonClick = () => {
        console.log(fileName);

        const newBusinessAddress = `${zonecode} ${businessAddress} ${businessAddressDetail}`;
        postBusinessInfo(
            ceo,
            email,
            businessName,
            startDate,
            businessNumber,
            newBusinessAddress,
            businessPhone,
            formData,
        ).then((res) => {
            if (res.data) {
                alert("사업자 인증 성공");
                router.replace("/application/account-info");
            }
            if (res === 520) {
                alert("사업자 인증 실패");
            }
        });
    };

    return (
        <>
            <HeaderContainer>
                <HeaderWrapper>셀러 계정 신청</HeaderWrapper>
                <ProgressBox>
                    <StepBox backgroundColor="#fdb757" />
                    <StepLine />
                    <StepBox backgroundColor="black" />
                    <StepLine />
                    <StepBox backgroundColor="black" />
                </ProgressBox>
            </HeaderContainer>
            <ResultBox>
                <OwnerInfo onCeoChange={handleCeoChange} onEmailChange={handleEmailChange} />
                <SellerInfo
                    onBusinessNameChange={handleBusinessNameChange}
                    onStartDateChange={handleStartDateChange}
                    onBusinessNumberChange={handleBusinessNumberChange}
                    onBusinessAddressChange={handleBusinessAddressChange}
                    onZonecodeChange={handleZonecodeChange}
                    onBusinessAddressDetailChange={handleBusinessAddressDetailChange}
                    onBusinessPhoneChange={handleBusinessPhoneChange}
                    onFileNameChange={handleFileNameChange}
                    onFormDataChange={handleFormDataChange}
                />
                <ButtonWrapper>
                    <TextButton
                        type="submit"
                        width="200px"
                        text="다음"
                        onClick={handleButtonClick}
                    />
                </ButtonWrapper>
            </ResultBox>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const RegistrationWithAuth = withAuth({ WrappedComponent: Registration, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
RegistrationWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default RegistrationWithAuth;
