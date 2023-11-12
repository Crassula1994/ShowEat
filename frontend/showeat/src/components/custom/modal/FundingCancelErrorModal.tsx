/* Import */
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface FundingCancelErrorModalProps {
    errorCode: number;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ModalWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;
`;

// ----------------------------------------------------------------------------------------------------

/* Funding Cancel Error Modal Component */
function FundingCancelErrorModal(props: FundingCancelErrorModalProps) {
    // States and Variables
    const { errorCode } = props;

    // Function for Making Error Message
    const makeErrorMessage = () => {
        switch (errorCode) {
            case 452:
                return "해당 펀딩이 더 이상 존재하지 않습니다.";
            case 481:
                return "이미 종료된 펀딩은 취소할 수 없습니다.";
            case 485:
                return "참여하지 않은 펀딩은 취소할 수 없습니다.";
            default:
                return "알 수 없는 에러가 발생했습니다.";
        }
    };

    return <ModalWrapper>{makeErrorMessage()}</ModalWrapper>;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingCancelErrorModal;
