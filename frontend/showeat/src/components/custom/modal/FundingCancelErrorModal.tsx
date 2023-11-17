/* Import */
import { breakTextLine } from "@utils/format";
import Image from "next/image";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface FundingCancelErrorModalProps {
    errorCode: number;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ModalContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2em;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const TextWrapper = styled("div")`
    // Text Attribute
    text-align: center;
`;

// ----------------------------------------------------------------------------------------------------

/* Funding Cancel Error Modal Component */
function FundingCancelErrorModal(props: FundingCancelErrorModalProps) {
    // States and Variables
    const { errorCode } = props;

    // Function for Making Error Message
    const makeErrorMessage = () => {
        switch (errorCode) {
            case 401:
                return "로그인이 필요한 서비스입니다.\n\n로그인 페이지로 이동하시겠습니까?";
            case 452:
                return "해당 펀딩이 더 이상 존재하지 않습니다.";
            case 481:
                return "이미 종료된 펀딩은 취소할 수 없습니다.";
            case 485:
                return "참여하지 않은 펀딩은 취소할 수 없습니다.";
            case 500:
                return "서버에서 예측하지 못한 에러가 발생했습니다.\n\n잠시 후 다시 시도해주시기 바랍니다.";
            default:
                return "알 수 없는 에러가 발생했습니다.\n\n같은 에러가 반복될 경우 관리자에게 문의 바랍니다.";
        }
    };

    return (
        <ModalContainer>
            <Image
                src="/assets/images/angry-cook-cow.png"
                width={150}
                height={150}
                alt="angry-cook-cow"
                priority
            />
            <TextWrapper dangerouslySetInnerHTML={{ __html: breakTextLine(makeErrorMessage()) }} />
        </ModalContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingCancelErrorModal;
