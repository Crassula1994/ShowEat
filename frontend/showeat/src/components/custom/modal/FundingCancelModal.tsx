/* Import */
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Style */
const ModalWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;
`;

// ----------------------------------------------------------------------------------------------------

/* Funding Cancel Modal Component */
function FundingCancelModal() {
    return <ModalWrapper>정말 펀딩을 취소하시겠습니까?</ModalWrapper>;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingCancelModal;
