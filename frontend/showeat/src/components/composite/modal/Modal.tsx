/* Import */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
import Overlay from "@components/common/overlay";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { TextButton } from "@components/common/button";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface ModalProps {
    width: string;
    height: string;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    modalTitle?: string;
    titleFontSize?: number;
    childComponent: ReactNode;
    buttonType: "confirm" | "close" | "submit";
    buttonWidth: string;
    buttonHeight?: string;
    buttonFontSize?: number;
    buttonColorType?: "primary" | "secondary" | "gray";
    buttonFill?: "positive" | "negative";
    buttonCurve?: "curved" | "round";
    onSubmit?: () => void;
    submitButtonText?: string;
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
    box-sizing: border-box;

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
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // Box Model Attribute
    width: 100%;
    overflow: hidden;

    // Text Attribute
    text-overflow: ellipsis;
`;

const ModalTitleWrapper = styled("div")<{ titleFontSize: number }>`
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;

    margin-bottom: 1em;

    font-weight: 700;
    font-size: ${(props) => props.titleFontSize}px;
`;

const ModalChildWrapper = styled("div")`
    overflow-y: scroll;
`;

const ButtonContainer = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    // Box Model Attribute
    width: 100%;
    margin-top: 2em;
`;

// ----------------------------------------------------------------------------------------------------

/* Modal Component */
function Modal(props: ModalProps) {
    const {
        width,
        height,
        isOpen,
        setIsOpen,
        modalTitle = "",
        titleFontSize = 24,
        childComponent,
        buttonType,
        buttonWidth,
        buttonHeight = "40px",
        buttonFontSize = 16,
        buttonColorType = "primary",
        buttonFill = "positive",
        buttonCurve = "curved",
        onSubmit,
        submitButtonText = "저장",
    } = props;

    if (isOpen) {
        return (
            <Overlay zIndex={900}>
                <ModalOuterContainer width={width} height={height} isOpen={isOpen}>
                    <ModalInnerContainer>
                        {modalTitle && (
                            <ModalTitleWrapper titleFontSize={titleFontSize}>
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
                                    colorType={buttonColorType}
                                    fill={buttonFill}
                                    curve={buttonCurve}
                                    onClick={() => setIsOpen(false)}
                                    fontSize={buttonFontSize}
                                />
                            )}
                            {buttonType === "close" && (
                                <TextButton
                                    text="닫기"
                                    width={buttonWidth}
                                    height={buttonHeight}
                                    colorType={buttonColorType}
                                    fill={buttonFill}
                                    curve={buttonCurve}
                                    onClick={() => setIsOpen(false)}
                                    fontSize={buttonFontSize}
                                />
                            )}
                            {buttonType === "submit" && (
                                <>
                                    <TextButton
                                        width={buttonWidth}
                                        height={buttonHeight}
                                        onClick={onSubmit}
                                        fontSize={buttonFontSize}
                                        text={submitButtonText}
                                        colorType={buttonColorType}
                                        fill="positive"
                                        curve={buttonCurve}
                                    />
                                    <TextButton
                                        width={buttonWidth}
                                        height={buttonHeight}
                                        onClick={() => setIsOpen(false)}
                                        fontSize={buttonFontSize}
                                        text="취소"
                                        colorType={buttonColorType}
                                        fill="negative"
                                        curve={buttonCurve}
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
