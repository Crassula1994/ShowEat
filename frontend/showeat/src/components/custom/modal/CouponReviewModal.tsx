/* Import */
import styled from "@emotion/styled";
import TextArea from "@components/common/input/TextArea";
import { useState } from "react";
import { TextButton } from "@components/common/button";
import { postReview } from "@apis/coupons";
import { CouponType } from "@/customTypes/apiProps";
import Image from "next/image";
import Modal from "@/components/composite/modal";

// ----------------------------------------------------------------------------------------------------

/* Type */

interface CouponReviewModalProps {
    couponId: number;
    closeReviewModal: () => void;
    setCouponData: React.Dispatch<React.SetStateAction<CouponType[]>>;
    setSelectedCoupon: React.Dispatch<React.SetStateAction<CouponType | null>>;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ReviewWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    align-items: center;
    background: #fff;
    gap: 25px;
`;

const ReviewContainer = styled("div")`
    color: #000;
    text-align: center;
    font-size: 30px;
    font-weight: 900;
    margin-bottom: 20px;
`;

const TextAreaContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 98%;

    box-sizing: border-box;
`;

const TextButtonContainer = styled("div")`
    width: 80%;
    display: flex;
    justify-content: space-around;
    overflow-x: hidden;
    overflow-y: hidden;
`;

const SuceessModalContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const SuccessModalDescriptionWrapper = styled("span")`
    font-size: 22px;
    font-weight: 700;

    padding: 1em 0;

    @media (max-width: 767px) {
        font-size: 14px;
    }
`;

const SuccessCowWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 90%;

    box-sizing: border-box;
`;

// ----------------------------------------------------------------------------------------------------

/* Success Modal Component */
function SuccessModal() {
    return (
        <SuceessModalContainer>
            <SuccessCowWrapper>
                <Image
                    src="/assets/images/happy-cook-cow.png"
                    alt="happy-cow"
                    width={150}
                    height={150}
                />
            </SuccessCowWrapper>
            <SuccessModalDescriptionWrapper>
                리뷰 등록을 완료했습니다.
            </SuccessModalDescriptionWrapper>
        </SuceessModalContainer>
    );
}

/* Coupon Review Modal Component */
function CouponReviewModal({
    couponId,
    closeReviewModal,
    setCouponData,
    setSelectedCoupon,
}: CouponReviewModalProps) {
    const [message, setMessage] = useState("");
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        setMessage(newValue);
    };

    const handleReviewSubmit = () => {
        postReview(couponId, message).then((res) => {
            if (res.statusCode === 200) {
                setCouponData((prev) => {
                    return prev.map((coupon) => {
                        if (coupon.couponId === couponId) {
                            return {
                                ...coupon,
                                writeCouponReview: true,
                            };
                        }
                        return coupon;
                    });
                });
                setSelectedCoupon((prev) => {
                    if (prev) {
                        return {
                            ...prev,
                            writeCouponReview: true,
                        };
                    }
                    return null;
                });

                setIsSuccessModalOpen(true);
                setTimeout(() => {
                    setIsSuccessModalOpen(false);
                    closeReviewModal();
                }, 2000);
            }
        });
    };
    return (
        <ReviewWrapper>
            <ReviewContainer>리뷰 작성</ReviewContainer>
            <TextAreaContainer>
                <TextArea
                    id="message"
                    width="100%"
                    maxLength={400}
                    value={message}
                    textareaName=""
                    height="180px"
                    fontSize="16px"
                    labelFontSize="14px"
                    error={false}
                    onChange={(e) => {
                        handleChangeText(e);
                    }}
                />
            </TextAreaContainer>
            <TextButtonContainer>
                <TextButton
                    text="저장"
                    width="160px"
                    height="40px"
                    fontSize={20}
                    colorType="primary"
                    onClick={handleReviewSubmit}
                />
                <TextButton
                    text="취소"
                    width="160px"
                    height="40px"
                    fontSize={20}
                    fill="negative"
                    colorType="primary"
                    onClick={closeReviewModal}
                />
            </TextButtonContainer>
            <Modal
                childComponent={SuccessModal()}
                width="500px"
                height="300px"
                isOpen={isSuccessModalOpen}
                setIsOpen={setIsSuccessModalOpen}
                buttonType="none"
                buttonWidth="200px"
                buttonHeight="50px"
                buttonFontSize={20}
            />
        </ReviewWrapper>
    );
}
// ----------------------------------------------------------------------------------------------------

/* Export */
export default CouponReviewModal;
