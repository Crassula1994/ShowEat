/* Import */
import styled from "@emotion/styled";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { TextInput } from "@components/common/input";
import TextButton from "@components/common/button/TextButton";
import Head from "next/head";

// ----------------------------------------------------------------------------------------------------

/* Type */
declare global {
    interface Window {
        daum: {
            Postcode: {
                new (options: { oncomplete: (data: IAddr) => void }): {
                    open: () => void;
                };
            };
        };
    }
}

interface IAddr {
    address: string;
    zonecode: string;
}

interface SellerInfoProps {
    onBusinessNameChange: (value: string) => void;
    onStartDateChange: (value: string) => void;
    onBusinessNumberChange: (value: string) => void;
    onBusinessAddressChange: (value: string) => void;
    onZonecodeChange: (value: string) => void;
    onBusinessAddressDetailChange: (value: string) => void;
    onBusinessPhoneChange: (value: string) => void;
    onFileNameChange: (value: string) => void;
    onFormDataChange: (value: FormData) => void;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const InputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const SellerInfoWrapper = styled("div")`
    display: flex;
    width: 165px;
    height: 34px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
`;

const LabelWrapper = styled("div")`
    display: flex;
    width: 120px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const BusinessRegistrationWrapper = styled("div")`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 727px;
`;

const InputBox = styled("div")`
    display: flex;
    align-items: flex-start;
    gap: 54px;
`;

// ----------------------------------------------------------------------------------------------------

/* Seller Info Component */
function SellerInfo({
    onBusinessNameChange,
    onStartDateChange,
    onBusinessNumberChange,
    onBusinessAddressChange,
    onZonecodeChange,
    onBusinessAddressDetailChange,
    onBusinessPhoneChange,
    onFileNameChange,
    onFormDataChange,
}: SellerInfoProps) {
    const [businessName, setBusinessName] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [businessNumber, setBusinessNumber] = useState<string>("");
    const [businessAddress, setBusinessAddress] = useState<string>("");
    const [zonecode, setZonecode] = useState<string>("");
    const [businessAddressDetail, setBusinessAddressDetail] = useState<string>("");
    const [businessPhone, setBusinessPhone] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [, setFormData] = useState<FormData>(new FormData());

    const handleBusinessNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        setBusinessName(value);
        onBusinessNameChange(value);
    };

    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        setStartDate(value);
        onStartDateChange(value);
    };

    const handleBusinessNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        setBusinessNumber(value);
        onBusinessNumberChange(value);
    };

    const handleZonecodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        setZonecode(value);
        onZonecodeChange(value);
    };

    const handleBusinessAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setBusinessAddress(newValue);
        onBusinessAddressChange(newValue);
    };

    const handleBusinessAddressDetailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setBusinessAddressDetail(newValue);
        onBusinessAddressDetailChange(newValue);
    };

    const handleBusinessPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        setBusinessPhone(value);
        onBusinessPhoneChange(value);
    };

    const businessRegistrationInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (businessRegistrationInputRef.current) {
            businessRegistrationInputRef.current.click();
        }
    };

    const handleBusinessRegistrationChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            const value = selectedFile.name;
            setFileName(value);
            onFileNameChange(value);
            const newFormData = new FormData();
            newFormData.append("businessRegistration", selectedFile);
            setFormData(newFormData);
            onFormDataChange(newFormData);
        }
    };

    useEffect(() => {
        const loadDaumPostcode = () => {
            const script = document.createElement("script");

            script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
            script.async = true;
            document.body.appendChild(script);
        };

        if (window.daum) {
            loadDaumPostcode();
        }
    }, []);

    const onClickAddress = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete(data: IAddr) {
                    setBusinessAddress(data.address);
                    setZonecode(data.zonecode);
                    onBusinessAddressChange(data.address);
                    onZonecodeChange(data.zonecode);
                },
            }).open();
        }
    };

    return (
        <>
            <Head>
                <title>사업자 등록 정보 입력</title>
                <meta
                    name="description"
                    content="사업자 등록 번호를 조회하고, 업체 정보를 입력해주세요."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <InputContainer>
                <SellerInfoWrapper>사업자 정보</SellerInfoWrapper>
                <InputBox>
                    <LabelWrapper>상호 또는 법인명</LabelWrapper>
                    <TextInput
                        width="727px"
                        height="40px"
                        id="businessName"
                        value={businessName}
                        placeholder="쑈잇"
                        onChange={handleBusinessNameChange}
                    />
                </InputBox>
                <InputBox>
                    <LabelWrapper>사업 시작일</LabelWrapper>
                    <TextInput
                        width="727px"
                        height="40px"
                        id="startDate"
                        value={startDate}
                        placeholder="20231111"
                        onChange={handleStartDateChange}
                    />
                </InputBox>
                <InputBox>
                    <LabelWrapper>사업자등록번호</LabelWrapper>
                    <TextInput
                        width="727px"
                        height="40px"
                        id="businessNumber"
                        value={businessNumber}
                        placeholder="1098177256"
                        onChange={handleBusinessNumberChange}
                    />
                </InputBox>
                <InputBox>
                    <LabelWrapper>주소</LabelWrapper>
                    <TextInput
                        width="575px"
                        height="40px"
                        id="zonecode"
                        value={zonecode}
                        placeholder="우편번호"
                        onChange={handleZonecodeChange}
                    />
                    <ButtonWrapper>
                        <TextButton width="100px" text="검색" onClick={onClickAddress} />
                    </ButtonWrapper>
                </InputBox>
                <InputBox>
                    <LabelWrapper />
                    <TextInput
                        width="727px"
                        height="40px"
                        id="businessAddress"
                        value={businessAddress}
                        placeholder="도로명주소"
                        onChange={handleBusinessAddressChange}
                    />
                </InputBox>
                <InputBox>
                    <LabelWrapper />
                    <TextInput
                        width="727px"
                        height="40px"
                        id="businessAddressDetail"
                        value={businessAddressDetail}
                        placeholder="상세주소"
                        onChange={handleBusinessAddressDetailChange}
                    />
                </InputBox>
                <InputBox>
                    <LabelWrapper>연락처</LabelWrapper>
                    <TextInput
                        width="727px"
                        height="40px"
                        id="businessPhone"
                        value={businessPhone}
                        placeholder="01012341234"
                        onChange={handleBusinessPhoneChange}
                    />
                </InputBox>
                <InputBox>
                    <LabelWrapper>사업자등록증</LabelWrapper>
                    <input
                        type="file"
                        ref={businessRegistrationInputRef}
                        style={{ display: "none" }}
                        onChange={handleBusinessRegistrationChange}
                    />
                    <BusinessRegistrationWrapper>
                        <TextButton width="100px" text="업로드" onClick={handleButtonClick} />
                        {fileName}
                    </BusinessRegistrationWrapper>
                </InputBox>
            </InputContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SellerInfo;
