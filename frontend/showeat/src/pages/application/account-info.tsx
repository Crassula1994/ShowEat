/* Import */
import withAuth from "@libs/withAuth";
import styled from "@emotion/styled";
import SingleLayout from "@layouts/SingleLayout";
import { ReactNode, ChangeEvent, useState, useRef } from "react";
import { useRouter } from "next/router";
import { postAccountInfo } from "@apis/business";
import { TextInput } from "@components/common/input";
import TextButton from "@components/common/button/TextButton";

interface StepBoxProps {
    backgroundColor: string;
}

const AccountInfoContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 80px;
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
    margin-top: 0.5em;
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
    margin-top: 0.5em;
    align-items: center;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
`;

function AccountInfo() {
    // States and Variables
    const router = useRouter();
    const [accountHolder, setAccountHolder] = useState<string>("");
    const [accountBank, setAccountBank] = useState<string>("");
    const [accountNumber, setAccountNumber] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const [formData, setFormData] = useState<FormData>(new FormData());

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
            console.log(formData);
        }
    };

    const handleSubmit = () => {
        postAccountInfo(accountHolder, accountBank, accountNumber, formData).then((res) => {
            if (res === 520) {
                alert("등록 실패");
                return;
            }

            router.replace("/application/result");
        });
    };

    return (
        <>
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
