import styled from "@emotion/styled";
import { ChangeEvent, useState } from "react";
import { TextInput } from "@components/common/input";

const InputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const OwnerInfoWrapper = styled("div")`
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

interface OwnerInfoProps {
    onCeoChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function OwnerInfo({ onCeoChange, onEmailChange }: OwnerInfoProps) {
    const [ceo, setCeo] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    return (
        <InputContainer>
            <OwnerInfoWrapper>대표자 정보</OwnerInfoWrapper>
            <InputBox>
                <LabelWrapper>대표자명</LabelWrapper>
                <TextInput
                    width="727px"
                    height="40px"
                    id="ceo"
                    value={ceo}
                    placeholder="쑈잇"
                    onChange={(event) => {
                        setCeo(event.target.value.trim());
                        onCeoChange(event);
                    }}
                />
            </InputBox>
            <InputBox>
                <LabelWrapper>대표자 이메일</LabelWrapper>
                <TextInput
                    width="727px"
                    height="40px"
                    id="email"
                    value={email}
                    placeholder="showeat@gmail.com"
                    onChange={(event) => {
                        setEmail(event.target.value.trim());
                        onEmailChange(event);
                    }}
                />
            </InputBox>
        </InputContainer>
    );
}

export default OwnerInfo;
