/* Import */
import withAuth from "@libs/withAuth";
import { ReactNode, useRef, useState } from "react";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import styled from "@emotion/styled";
import SingleLayout from "@layouts/SingleLayout";
import { TextButton } from "@components/common/button";
import { useRouter } from "next/router";
import getQRCode from "@apis/qr";
import Modal from "@components/composite/modal";

// ----------------------------------------------------------------------------------------------------

/* Style */
const RedeemContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 800px;
`;

const TitleContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 1.4em;
    padding-bottom: 0.6em;
`;

const TitleWrapper = styled("span")`
    font-size: 30px;
    font-weight: 700;

    padding: 0.2em;
`;

const DescriptionWrapper = styled("span")`
    font-size: 16px;
    color: ${(props) => props.theme.colors.gray4};
`;

const WebcamWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 400px;

    padding: 1em;
`;

const ButtonContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: 450px;
`;

const FailedModalContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const ModalTitleWrapper = styled("span")`
    font-size: 30px;
    font-weight: 700;

    padding: 0.5em;
`;

const ModalDescriptionWrapper = styled("span")`
    font-size: 18px;

    padding: 2em;
`;

// ----------------------------------------------------------------------------------------------------

/* Failed Modal Component */
function FailedModal() {
    return (
        <FailedModalContainer>
            <ModalTitleWrapper>인식 실패</ModalTitleWrapper>
            <ModalDescriptionWrapper>QR 코드 인식에 실패했습니다.</ModalDescriptionWrapper>
        </FailedModalContainer>
    );
}

/* Seller Reading Redeem Page */
function Redeem() {
    const router = useRouter();
    const webcamRef = useRef<Webcam>(null);

    const [isOpen, setIsOpen] = useState(false);

    const videoConstraints = {
        height: 360,
    };

    const readQRCode = (imageSrc: string) => {
        const canvas = document.createElement("canvas");
        const img = new Image();

        img.src = imageSrc;

        img.onload = function loadImage() {
            if (img.width && img.height) {
                canvas.width = img.width;
                canvas.height = img.height;

                const context = canvas.getContext("2d");
                if (context) {
                    context.drawImage(img, 0, 0, img.width, img.height);

                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);

                    if (code) {
                        return code.data;
                    }
                }
            }
            return null;
        };
        return null;
    };

    const capture = () => {
        const imageSrc = webcamRef.current?.getScreenshot() || "";

        const qrCode = readQRCode(imageSrc);
        if (qrCode) {
            console.log("QR Code:", qrCode);
            getQRCode(imageSrc).then((res) => {
                console.log(res);
                // 임시로 써둔 코드, api 돌아오면 url을 통한거로 바꿀 것.
                router.push(`/sellers/redeem/result/${imageSrc}`);
            });
        } else {
            setIsOpen(true);
        }
    };

    return (
        <RedeemContainer>
            <TitleContainer>
                <TitleWrapper>발급한 쿠폰으로 결제하기</TitleWrapper>
                <DescriptionWrapper>
                    발급한 쿠폰 결제를 위해 웹캠에 QR 코드가 선명하게 나오도록 해주세요.
                </DescriptionWrapper>
            </TitleContainer>
            <WebcamWrapper>
                <Webcam
                    style={{ borderRadius: "20px", maxHeight: "360px" }}
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
            </WebcamWrapper>
            <ButtonContainer>
                <TextButton
                    text="QR 코드 인식"
                    width="200px"
                    height="50px"
                    fontSize={20}
                    onClick={capture}
                />
                <TextButton
                    text="취소"
                    width="200px"
                    height="50px"
                    fill="negative"
                    fontSize={20}
                    onClick={() => router.back()}
                />
            </ButtonContainer>
            <Modal
                childComponent={FailedModal()}
                width="500px"
                height="300px"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                buttonType="close"
                buttonWidth="200px"
                buttonHeight="50px"
                buttonFontSize={20}
            />
        </RedeemContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const RedeemWithAuth = withAuth({
    WrappedComponent: Redeem,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
RedeemWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default RedeemWithAuth;
