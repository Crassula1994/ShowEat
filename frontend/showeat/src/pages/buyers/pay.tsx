// /* Import */
// // import Image from "next/image";
// import { TextButton } from "@components/common/button";
// import { RadioButton } from "@/components/common/input";
// import React, { ReactNode, useState, useEffect } from "react";
// import SingleLayout from "@layouts/SingleLayout";
// import styled from "@emotion/styled";
// import withAuth from "@libs/withAuth";
// import { getUserInfo } from "@apis/users";
// import useUserState from "@hooks/useUserState";
// import { fetchModify } from "@utils/api";
// import { FetchProps } from "@customTypes/apiProps";

// // ----------------------------------------------------------------------------------------------------

// /* Style */
// const PaymentContainer = styled("div")`
//     // Layout Attribute
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;

//     // Box Model Attribute
//     height: calc(100vh - 80px);
//     min-height: 1200px;
//     margin-top: 60px;
// `;

// const SelectAmountContainer = styled("div")`
//     width: 50%;
//     height: 45%;
//     margin-bottom: 10%;
// `;

// const BuyerInfoContainer = styled("div")`
//     width: 50%;
//     height: 25%;
//     margin-bottom: 5%;
// `;

// const BuyerInfoTitleWrapper = styled("div")`
//     margin-bottom: 5%;
//     color: #000;

//     font-family: Pretendard;
//     font-size: 30px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: normal;
// `;

// const BuyerInfoTextBox = styled("div")`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//     gap: 30px; /* 원하는 간격 값으로 조정 */
// `;

// const BuyerInfoTextWrapper = styled("div")`
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
// `;

// const BuyerInfoTextLeft = styled("div")`
//     width: 150px;
//     height: 40px;
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;

//     color: #000;
//     font-family: Pretendard;
//     font-size: 24px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: 60px;
// `;

// const BuyerInfoTextRight = styled("div")`
//     width: 150px;
//     height: 40px;
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;

//     color: #000;
//     text-align: right;
//     font-family: Pretendard;
//     font-size: 20px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: 60px;
// `;

// const CashChargeWrapper = styled("div")`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     flex-shrink: 0;
//     color: #000;

//     text-align: center;
//     font-family: Pretendard;
//     font-size: 40px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: 60px; /* 150% */
//     margin-bottom: 30px;
// `;

// const RadioButtonContainer = styled("div")`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     align-items: center;
//     width: 100%;
//     height: 70%;
//     margin-bottom: 3%;
// `;

// const RadioButtonBox = styled("div")`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     width: 60%;
//     height: 80%;
// `;

// const RadioButtons = styled("div")`
//     width: 30%;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     gap: 40px;
// `;

// const HorizontalLine = styled("div")`
//     width: 100%;
//     height: 0.5px;
//     background-color: gray;
// `;

// const TotalAmountWrapper = styled("div")`
//     display: flex;
//     width: 100%;
//     justify-content: space-between;
//     align-items: flex-start;
// `;

// const TotalAmountText = styled("div")`
//     color: #000;

//     font-family: Pretendard;
//     font-size: 24px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: normal;
// `;
// // ----------------------------------------------------------------------------------------------------

// /* Payment Page */
// function Payment() {
//     // States and Variables
//     const [selectedValue, setSelectedValue] = useState("0");
//     const [user] = useUserState();
//     const [nickname, setNickname] = useState("");
//     const [currentPoint, setCurrentPoint] = useState(0);
//     const [afterPoint, setAfterPoint] = useState(0);
//     // const [orderName, setOrderName] = useState("카우카우 금액권");
//     // const [amount, setAmount] = useState(10000);

//     useEffect(() => {
//         const { userId } = user;

//         if (userId !== 0) {
//             getUserInfo(userId).then((result) => {
//                 const { userNickname, userMoney } = result.data;
//                 setNickname(userNickname);
//                 setCurrentPoint(userMoney);
//             });
//         }
//     }, [user]);

//     // 선택한 금액에 따라 포인트 계산
//     useEffect(() => {
//         if (selectedValue) {
//             const selectedAmount = parseInt(selectedValue.replace(/[^0-9]/g, ""), 10);
//             if (!Number.isNaN(selectedAmount)) {
//                 setAfterPoint(currentPoint + selectedAmount);
//             }
//         }
//     }, [selectedValue, currentPoint]);

//     // 포인트를 ,000 형식으로 포맷하는 함수
//     const formatPoint = (point: number) => {
//         return point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     };

//     // handlePayment 함수
//     const handlePayment = () => {
//         // 1. 결제 요청에 필요한 데이터를 생성
//         const paymentData = {
//             payType: "카드",
//             orderName: "카우카우 금액권", // or orderName 상태값 사용
//             amount: 10000,
//             credentialId: "abcd1234",
//             userEmail: "example@gmail.com",
//             userNickname: nickname,
//         };

//         // 2. 백엔드의 결제 요청 API로 POST 요청을 보낸다.
//         fetchModify()
//         fetch("{NEXT_PUBLIC_ENDPOINT}/api/payments/request", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(paymentData),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 // 여기서 data를 가지고 토스페이먼츠의 결제창을 열고 결제를 진행할 수 있습니다.
//                 // 결제 성공 또는 실패 시, 백엔드에서 설정한 successUrl 또는 failUrl로 리다이렉트됩니다.
//                 // 아래는 토스페이먼츠의 requestPayment 함수 호출 예시입니다.

//                 tossPayments.requestPayment("카드", {
//                     // 결제 정보 파라미터 설정
//                     // ...
//                     onSuccess: (result) => {
//                         // 결제 성공 시, successUrl로 리다이렉트
//                         window.location.href = data.successUrl;
//                     },
//                     onFail: (result) => {
//                         // 결제 실패 시, failUrl로 리다이렉트
//                         window.location.href = data.failUrl;
//                     },
//                 });
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });
//     };

//     return (
//         <PaymentContainer>
//             <SelectAmountContainer>
//                 <CashChargeWrapper>캐시카우 충전</CashChargeWrapper>
//                 <RadioButtonContainer>
//                     <HorizontalLine />
//                     <RadioButtonBox>
//                         <RadioButtons>
//                             <RadioButton
//                                 width="100%"
//                                 id="1"
//                                 name="payment"
//                                 value="5000"
//                                 radioName="￦5,000"
//                                 iconURL="/assets/icons/cashcow-coin-icon.svg"
//                                 onClick={() => setSelectedValue("5,000")}
//                             />
//                             <RadioButton
//                                 width="100%"
//                                 id="2"
//                                 name="payment"
//                                 value="10000"
//                                 radioName="￦10,000"
//                                 iconURL="/assets/icons/cashcow-coin-icon.svg"
//                                 onClick={() => setSelectedValue("10,000")}
//                             />
//                             <RadioButton
//                                 width="100%"
//                                 id="3"
//                                 name="payment"
//                                 value="20000"
//                                 radioName="￦20,000"
//                                 iconURL="/assets/icons/cashcow-coin-icon.svg"
//                                 onClick={() => setSelectedValue("20,000")}
//                             />
//                             <RadioButton
//                                 width="100%"
//                                 id="4"
//                                 name="payment"
//                                 value="30000"
//                                 radioName="￦30,000"
//                                 iconURL="/assets/icons/cashcow-coin-icon.svg"
//                                 onClick={() => setSelectedValue("30,000")}
//                             />
//                             <RadioButton
//                                 width="100%"
//                                 id="4"
//                                 name="payment"
//                                 value="50000"
//                                 radioName="￦50,000"
//                                 iconURL="/assets/icons/cashcow-coin-icon.svg"
//                                 onClick={() => setSelectedValue("50,000")}
//                             />
//                         </RadioButtons>
//                         <RadioButtons>
//                             <RadioButton
//                                 width="100%"
//                                 id="6"
//                                 name="payment"
//                                 value="100000"
//                                 radioName="￦100,000"
//                                 iconURL="/assets/icons/cashcow-coin-icon.svg"
//                                 onClick={() => setSelectedValue("100,000")}
//                             />
//                             <RadioButton
//                                 width="100%"
//                                 id="7"
//                                 name="payment"
//                                 value="200000"
//                                 radioName="￦200,000"
//                                 iconURL="/assets/icons/cashcow-coin-icon.svg"
//                                 onClick={() => setSelectedValue("200,000")}
//                             />
//                             <RadioButton
//                                 width="100%"
//                                 id="8"
//                                 name="payment"
//                                 value="300000"
//                                 radioName="￦300,000"
//                                 iconURL="/assets/icons/cashcow-coin-icon.svg"
//                                 onClick={() => setSelectedValue("300,000")}
//                             />
//                             <RadioButton
//                                 width="100%"
//                                 id="9"
//                                 name="payment"
//                                 value="500000"
//                                 radioName="￦500,000"
//                                 iconURL="/assets/icons/cashcow-coin-icon.svg"
//                                 onClick={() => setSelectedValue("500,000")}
//                             />
//                             <RadioButton
//                                 width="100%"
//                                 id="10"
//                                 name="payment"
//                                 value="1000000"
//                                 radioName="￦1,000,000"
//                                 iconURL="/assets/icons/cashcow-coin-icon.svg"
//                                 onClick={() => setSelectedValue("1,000,000")}
//                             />
//                         </RadioButtons>
//                     </RadioButtonBox>
//                     <HorizontalLine />
//                 </RadioButtonContainer>
//                 <TotalAmountWrapper>
//                     <TotalAmountText>총 결제 금액</TotalAmountText>
//                     <TotalAmountText>￦{selectedValue}</TotalAmountText>
//                 </TotalAmountWrapper>
//             </SelectAmountContainer>
//             <BuyerInfoContainer>
//                 <BuyerInfoTitleWrapper>바이어 정보</BuyerInfoTitleWrapper>
//                 <BuyerInfoTextBox>
//                     <BuyerInfoTextWrapper>
//                         <BuyerInfoTextLeft>닉네임</BuyerInfoTextLeft>
//                         <BuyerInfoTextRight>{nickname}</BuyerInfoTextRight>
//                     </BuyerInfoTextWrapper>
//                     <BuyerInfoTextWrapper>
//                         <BuyerInfoTextLeft>보유 포인트</BuyerInfoTextLeft>
//                         <BuyerInfoTextRight>{formatPoint(currentPoint)} P</BuyerInfoTextRight>
//                     </BuyerInfoTextWrapper>
//                     <BuyerInfoTextWrapper>
//                         <BuyerInfoTextLeft>결제 후 포인트</BuyerInfoTextLeft>
//                         <BuyerInfoTextRight>{formatPoint(afterPoint)} P</BuyerInfoTextRight>
//                     </BuyerInfoTextWrapper>
//                 </BuyerInfoTextBox>
//             </BuyerInfoContainer>
//             <TextButton
//                 width="25%"
//                 height="5%"
//                 type="button"
//                 text="결제"
//                 colorType="gray"
//                 curve="curved"
//                 fontSize={27}
//                 onClick={handlePayment}
//             />
//         </PaymentContainer>
//     );
// }

// // ----------------------------------------------------------------------------------------------------

// /* Middleware */
// const PaymentWithAuth = withAuth({ WrappedComponent: Payment, guardType: "USER_ONLY" });

// // ----------------------------------------------------------------------------------------------------

// /* Layout */
// PaymentWithAuth.getLayout = function getLayout(page: ReactNode) {
//     return <SingleLayout>{page}</SingleLayout>;
// };

// // ----------------------------------------------------------------------------------------------------

// /* Export */
// export default PaymentWithAuth;
