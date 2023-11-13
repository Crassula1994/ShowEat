/* Import */
import styled from "@emotion/styled";
import TextArea from "@components/common/input/TextArea";
import { useState } from "react";
import { TextButton } from "@components/common/button";
import { postReview } from "@apis/coupons";

const ReviewWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 40px;
`;

const ReviewContainer = styled("div")`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
`;

const TextAreaContainer = styled("div")`
    width: 100%;
    margin-bottom: 20px;
`;

const TextButtonContainer = styled("div")`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

function Review() {
    const [message, setReview] = useState("");
    const handleChangeText = (e) => {
        const newValue = e.target.value;
        setReview(newValue);
    };

    const handleReviewSubmit = () => {
        const couponId = 1;

        postReview(couponId, message).then((res) => {
            if (res.statusCode === 200) {
                console.log(res);
            }
        });
    };
    return (
        <ReviewWrapper>
            <ReviewContainer>리뷰 작성</ReviewContainer>
            <TextAreaContainer>
                <TextArea
                    maxLength={200}
                    setTextValue={setReview}
                    height="150px"
                    fontSize="16px"
                    labelFontSize="14px"
                    error={false}
                    onChange={handleChangeText}
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

// Export
export default Review;
