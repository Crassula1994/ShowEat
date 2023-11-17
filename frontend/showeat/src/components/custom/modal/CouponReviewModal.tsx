/* Import */
import styled from "@emotion/styled";
import TextArea from "@components/common/input/TextArea";
import { useState } from "react";
import { TextButton } from "@components/common/button";
import { postReview } from "@apis/coupons";
import { CouponType } from "@/customTypes/apiProps";

const ReviewWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    font-family: Pretendard;
    font-size: 20px;
    align-items: center;
    background: #fff;
    gap: 25px;
`;

const ReviewContainer = styled("div")`
    color: #000;
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

const TextButtonContainer = styled("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    overflow-x: hidden;
    overflow-y: hidden;
`;

function CouponReviewModal({
    couponId,
    closeReviewModal,
    setCouponData,
    setSelectedCoupon,
}: {
    couponId: number;
    closeReviewModal: () => void;
    setCouponData: React.Dispatch<React.SetStateAction<CouponType[]>>;
    setSelectedCoupon: React.Dispatch<React.SetStateAction<CouponType | null>>;
}) {
    const [message, setMessage] = useState("");
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

                closeReviewModal();
            }
        });
    };
    return (
        <ReviewWrapper>
            <ReviewContainer>리뷰 작성</ReviewContainer>
            <TextAreaContainer>
                <TextArea
                    id="message"
                    width="550px"
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
                    width="140px"
                    height="40px"
                    fontSize={20}
                    colorType="primary"
                    onClick={handleReviewSubmit}
                />
            </TextButtonContainer>
        </ReviewWrapper>
    );
}
// ----------------------------------------------------------------------------------------------------

/* Export */
export default CouponReviewModal;
