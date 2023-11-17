/* Import */
import styled from "@emotion/styled";

const ModalWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    font-family: Pretendard;
    font-size: 20px;
    align-items: center;
    background: #fff;
    gap: 10px;
`;

const ModalContainer = styled("div")`
    color: red;
    text-align: center;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    margin-bottom: 20px;
`;

const TextAreaContainer = styled("div")`
    width: 100%;
`;
const TextWrapper = styled("div")`
    display: flex;
    width: 600px;
    height: 120px;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 25px;
    font-weight: 400;
    line-height: 44px; /* 176% */
`;

function SellerRegisterFailModal() {
    return (
        <ModalWrapper>
            <ModalContainer>사업자 인증 실패</ModalContainer>
            <TextAreaContainer>
                <TextWrapper>
                    사업자 정보가 일치하지 않습니다. <br /> 작성한 사업자 정보를 확인해주세요.
                </TextWrapper>
            </TextAreaContainer>
        </ModalWrapper>
    );
}
// ----------------------------------------------------------------------------------------------------

/* Export */
export default SellerRegisterFailModal;
