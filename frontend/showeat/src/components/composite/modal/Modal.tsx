/* Import */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
import Overlay from "../../common/overlay";
import { TextButton } from "../../common/button";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface ModalProps {
    childComponent: React.ReactNode;
    width: string;
    height: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    buttonType: "confirm" | "close" | "submit";
    buttonWidth: string;
    buttonHeight?: string;
    colorType?: "primary" | "secondary" | "gray";
    fill?: "positive" | "negative";
    curve?: "curved" | "round";
    onSubmit?: () => void;
    modalTitle?: string;
    titleSize?: string;
}

interface ModalOuterContainerType {
    width: string;
    height: string;
    isOpen: boolean;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const modalFadein = keyframes`
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
`;

const ModalOuterContainer = styled("div")<ModalOuterContainerType>`
    position: fixed;

    display: flex;
    justify-content: center;
    align-items: center;

    width: ${(props) => props.width};
    height: ${(props) => props.height};

    border-radius: 20px;

    padding: 2em 2em;

    background-color: white;

    box-shadow: 0px 0px 20px 10px ${(props) => props.theme.colors.gray5};

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;

    overflow: hidden;

    animation: ${(props) => props.isOpen && modalFadein} 0.2s ease-in-out forwards;
`;

const ModalInnerContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    overflow: hidden;
    text-overflow: ellipsis;

    width: 100%;
    height: 100%;
`;

const ModalTitleWrapper = styled("div")<{ titleSize: string }>`
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;

    padding-bottom: 1em;

    font-weight: 700;
    font-size: ${(props) => props.titleSize};
`;

const ModalChildWrapper = styled("div")`
    overflow-y: scroll;
`;

const ButtonContainer = styled("div")`
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    padding-top: 1em;
`;

// ----------------------------------------------------------------------------------------------------

/* Modal Component */
function Modal({
    childComponent,
    width,
    height,
    isOpen,
    setIsOpen,
    buttonType,
    buttonWidth,
    buttonHeight,
    colorType = "primary",
    fill = "positive",
    curve = "curved",
    onSubmit,
    modalTitle,
    titleSize = "24px",
}: ModalProps) {
    if (isOpen) {
        return (
            <Overlay zIndex={900}>
                <ModalOuterContainer width={width} height={height} isOpen={isOpen}>
                    <ModalInnerContainer>
                        {modalTitle && (
                            <ModalTitleWrapper titleSize={titleSize}>
                                {modalTitle}
                            </ModalTitleWrapper>
                        )}

                        <ModalChildWrapper>{childComponent}</ModalChildWrapper>
                        <ButtonContainer>
                            {buttonType === "confirm" && (
                                <TextButton
                                    text="확인"
                                    width={buttonWidth}
                                    height={buttonHeight}
                                    colorType={colorType}
                                    fill={fill}
                                    curve={curve}
                                    onClick={() => setIsOpen(false)}
                                />
                            )}
                            {buttonType === "close" && (
                                <TextButton
                                    text="닫기"
                                    width={buttonWidth}
                                    height={buttonHeight}
                                    colorType={colorType}
                                    fill={fill}
                                    curve={curve}
                                    onClick={() => setIsOpen(false)}
                                />
                            )}
                            {buttonType === "submit" && (
                                <>
                                    <TextButton
                                        text="저장"
                                        width={buttonWidth}
                                        height={buttonHeight}
                                        colorType={colorType}
                                        fill="positive"
                                        curve={curve}
                                        onClick={onSubmit}
                                    />
                                    <TextButton
                                        text="취소"
                                        width={buttonWidth}
                                        height={buttonHeight}
                                        colorType={colorType}
                                        fill="negative"
                                        curve={curve}
                                        onClick={() => setIsOpen(false)}
                                    />
                                </>
                            )}
                        </ButtonContainer>
                    </ModalInnerContainer>
                </ModalOuterContainer>
            </Overlay>
        );
    }
    return null;
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Modal;
