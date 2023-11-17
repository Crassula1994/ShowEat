/* Import */
import withAuth from "@libs/withAuth";
import styled from "@emotion/styled";
import SingleLayout from "@layouts/SingleLayout";
import { ReactNode, ChangeEvent, useState, useRef } from "react";
import { useRouter } from "next/router";
import { postAccountInfo } from "@apis/business";
import { TextInput } from "@components/common/input";
import TextButton from "@components/common/button/TextButton";
import useUserState from "@/hooks/useUserState";
import useSellerState from "@/hooks/useSellerState";
import Head from "next/head";
import Modal from "@/components/composite/modal";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface StepBoxProps {
    backgroundColor: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const AccountInfoContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 80px;

    padding-bottom: 4em;
`;

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

const InputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const AccountInfoWrapper = styled("div")`
    display: flex;
    width: 115px;
    height: 34px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 30px;
    font-weight: 700;
`;

const LabelWrapper = styled("div")`
    display: flex;
    width: 114px;
    height: 40px;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
`;

const InputBox = styled("div")`
    display: flex;
    align-items: flex-start;
    gap: 54px;
`;

const BankBookImgWrapper = styled("div")`
    margin-top: 0.5em;
    display: flex;
    width: 727px;
    gap: 10px;
    align-items: center;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
`;

const MultiModalContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const MultiModalTitleWrapper = styled("span")`
    font-size: 30px;
    font-weight: 700;

    padding: 0.5em;
`;

const MultiModalDescriptionWrapper = styled("span")`
    font-size: 18px;

    padding: 2em 0;

    @media (max-width: 767px) {
        font-size: 14px;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Multi Modal Component */
function MultiModal(isStatus: string) {
    const renderText = [
        {
            status: "SUCCESS",
            title: "등록 완료",
            description: "정산 정보를 등록 완료했습니다.",
        },
        {
            status: "UNKNOWN",
            title: "알 수 없는 오류",
            description: "개발진에게 문의 해주세요.",
        },
        {
            status: "FAILED",
            title: "요청 실패",
            description: "등록 요청이 실패했습니다.",
        },
    ];
    return (
        <MultiModalContainer>
            <MultiModalTitleWrapper>
                {renderText.find((text) => text.status === isStatus)?.title}
            </MultiModalTitleWrapper>
            <MultiModalDescriptionWrapper>
                {renderText.find((text) => text.status === isStatus)?.description}
            </MultiModalDescriptionWrapper>
        </MultiModalContainer>
    );
}

/* Account Info Page */
function AccountInfo() {
    // States and Variables
    const router = useRouter();
    const [, setUser] = useUserState();
    const [, setSeller] = useSellerState();
    const [accountHolder, setAccountHolder] = useState<string>("");
    const [accountBank, setAccountBank] = useState<string>("");
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [formData, setFormData] = useState<FormData>(new FormData());
    const [isMultiModalOpen, setIsMultiModalOpen] = useState(false);
    const [isStatus, setIsStatus] = useState("");

    const handleAccountHolderChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAccountHolder(event.target.value.trim());
    };

    const handleAccountBankChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAccountBank(event.target.value.trim());
    };

    const handleAccountNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAccountNumber(event.target.value.trim());
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (files && files.length > 0) {
            const selectedFile = files[0];
            setFileName(selectedFile.name);
            const newFormData = new FormData();
            newFormData.append("bankBook", selectedFile);
            setFormData(newFormData);
        }
    };

    const handleSubmit = () => {
        postAccountInfo(accountHolder, accountBank, accountNumber, formData).then((res) => {
            if (res.statusCode === 200) {
                setUser((prev) => ({
                    ...prev,
                    userBusiness: true,
                    userBusinessId: res.data.businessId,
                }));
                setSeller((prev) => ({
                    ...prev,
                    sellerId: res.data.businessId,
                    sellerName: res.data.businessName,
                    sellerImgUrl: res.data.businessImgUrl,
                }));
                setIsStatus("SUCCESS");
                setIsMultiModalOpen(true);
                setTimeout(() => {
                    router.replace("/application/result");
                }, 2000);
            } else if (res === 520) {
                setIsStatus("UNKNOWN");
                setIsMultiModalOpen(true);
            } else {
                setIsStatus("FAILED");
                setIsMultiModalOpen(true);
            }
        });
    };

    return (
        <>
            <Head>
                <title>정산 정보 입력</title>
                <meta name="description" content="정산받을 계좌 정보를 입력해주세요." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <HeaderContainer>
                <HeaderWrapper>셀러 계정 신청</HeaderWrapper>
                <ProgressBox>
                    <StepBox backgroundColor="black" />
                    <StepLine />
                    <StepBox backgroundColor="#fdb757" />
                    <StepLine />
                    <StepBox backgroundColor="black" />
                </ProgressBox>
            </HeaderContainer>
            <AccountInfoContainer>
                <InputContainer>
                    <AccountInfoWrapper>정산 정보</AccountInfoWrapper>
                    <InputBox>
                        <LabelWrapper>예금주명</LabelWrapper>
                        <TextInput
                            width="727px"
                            height="40px"
                            id="accountHolder"
                            value={accountHolder}
                            placeholder="쑈잇"
                            onChange={handleAccountHolderChange}
                        />
                    </InputBox>
                    <InputBox>
                        <LabelWrapper>계좌정보</LabelWrapper>
                        <TextInput
                            width="727px"
                            height="40px"
                            id="accountBank"
                            value={accountBank}
                            placeholder="싸피뱅크"
                            onChange={handleAccountBankChange}
                        />
                    </InputBox>
                    <InputBox>
                        <LabelWrapper />
                        <TextInput
                            width="727px"
                            height="40px"
                            id="accountNumber"
                            value={accountNumber}
                            placeholder="640-920346-45821"
                            onChange={handleAccountNumberChange}
                        />
                    </InputBox>
                    <InputBox>
                        <LabelWrapper>통장사본</LabelWrapper>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <BankBookImgWrapper>
                            <TextButton width="100px" text="업로드" onClick={handleButtonClick} />
                            {fileName}
                        </BankBookImgWrapper>
                    </InputBox>
                </InputContainer>

                <ButtonWrapper>
                    <TextButton type="submit" width="200px" text="다음" onClick={handleSubmit} />
                </ButtonWrapper>
            </AccountInfoContainer>
            <Modal
                childComponent={MultiModal(isStatus)}
                width="500px"
                height="300px"
                isOpen={isMultiModalOpen}
                setIsOpen={setIsMultiModalOpen}
                buttonType="close"
                buttonWidth="200px"
                buttonHeight="50px"
                buttonFontSize={20}
            />
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const AccountInfoWithAuth = withAuth({ WrappedComponent: AccountInfo, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
AccountInfoWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default AccountInfoWithAuth;
