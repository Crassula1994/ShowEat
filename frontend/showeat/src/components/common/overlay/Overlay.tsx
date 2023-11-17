/* Import */
import styled from "@emotion/styled";
import { OverlayProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Style */
const OverlayWrapper = styled("div")<{ zIndex: number }>`
    // Position Attribute
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${(props) => props.zIndex};

    // Box Model Attribute
    width: 100vw;
    height: 100vh;

    // Style Attribute
    background: rgba(0, 0, 0, 0.75);
`;

// ----------------------------------------------------------------------------------------------------

/* Overlay Component */
function Overlay(props: OverlayProps) {
    const { zIndex, children } = props;

    return <OverlayWrapper zIndex={zIndex}>{children}</OverlayWrapper>;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Overlay;
