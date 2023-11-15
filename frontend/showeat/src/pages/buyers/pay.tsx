/* Import */
import { TextButton } from "@components/common/button";
import { RadioButton } from "@/components/common/input";
import React, { ReactNode, useState, useEffect, useRef } from "react";
import SingleLayout from "@layouts/SingleLayout";
import styled from "@emotion/styled";
import withAuth from "@libs/withAuth";
import { getUserInfo } from "@apis/users";
import useUserState from "@hooks/useUserState";
import { postRequestPayments } from "@apis/payments";
import { PaymentWidgetInstance, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { useAsync } from "react-use";
import Head from "next/head";

/* Variables */
const FRONT_ENDPOINT = process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT;
const clientKey = "test_ck_QbgMGZzorzyKv2BGY6djVl5E1em4";
const customerKey = "test_sk_Ba5PzR0ArnWLjDw7vPe18vmYnNeD";

// ----------------------------------------------------------------------------------------------------

/* Style */
const PaymentContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    height: calc(100vh - 80px);
    min-height: 1200px;
    margin-top: 60px;
    margin-bottom: 7%;
`;

const SelectAmountContainer = styled("div")`
    width: 50%;
    height: 45%;
    margin-bottom: 7%;
`;

const BuyerInfoContainer = styled("div")`
    width: 50%;
    height: 25%;
    margin-bottom: 1%;
`;

const BuyerInfoTitleWrapper = styled("div")`
    margin-bottom: 5%;
    color: #000;

    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const BuyerInfoTextBox = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 30px; /* 원하는 간격 값으로 조정 */
`;

const BuyerInfoTextWrapper = styled("div")`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BuyerInfoTextLeft = styled("div")`
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    color: #000;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 60px;
`;

const BuyerInfoTextRight = styled("div")`
    width: 150px;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    color: #000;
    text-align: right;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 60px;
`;

const CashChargeWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;

    text-align: center;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: 60px; /* 150% */
    margin-bottom: 30px;
`;

const RadioButtonContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70%;
    margin-bottom: 3%;
`;

const RadioButtonBox = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    height: 80%;
`;

const RadioButtons = styled("div")`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
`;

const HorizontalLine = styled("div")`
    width: 100%;
    height: 0.5px;
    background-color: gray;
`;

const TotalAmountWrapper = styled("div")`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
`;

const TotalAmountText = styled("div")`
    color: #000;

    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const PaymentWidget = styled("div")`
    width: 50%;
`;

const Agreement = styled("div")`
    width: 50%;
`;

// ----------------------------------------------------------------------------------------------------

/* Payment Page */
function Payment() {
    // States and Variables
    const [selectedValue, setSelectedValue] = useState("5,000");
    const [user] = useUserState();
    const [currentPoint, setCurrentPoint] = useState(0);
    const [afterPoint, setAfterPoint] = useState(0);

    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
    const paymentMethodsWidgetRef = useRef<ReturnType<
        PaymentWidgetInstance["renderPaymentMethods"]
    > | null>(null);
    const [amount, setAmount] = useState(5000);

    useEffect(() => {
        const { userId } = user;

        if (userId !== 0) {
            getUserInfo(userId).then((result) => {
                const { userMoney } = result.data;

                setCurrentPoint(userMoney);
            });
        }
    }, [user]);

    // 선택한 금액에 따라 포인트 계산
    useEffect(() => {
        if (selectedValue) {
            const selectedAmount = parseInt(selectedValue.replace(/[^0-9]/g, ""), 10);
            if (!Number.isNaN(selectedAmount)) {
                setAfterPoint(currentPoint + selectedAmount);
            }
        }
    }, [selectedValue, currentPoint]);

    // 포인트를 ,000 형식으로 포맷하는 함수
    const formatPoint = (point: number) => {
        return point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // handlePayment 함수
    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
    const handlePayment = () => {
        // 1. 결제 요청에 필요한 데이터를 생성
        const payType = "CARD";
        const orderName = "카우카우 화폐";

        // 2. 백엔드의 결제 요청 API로 POST 요청을 보낸다.
        postRequestPayments(
            user.userId,
            payType,
            amount,
            orderName,
            user.credentialId,
            user.userEmail,
            user.userNickname,
        )
            .then((result) => {
                console.log(result.data);
                const { orderId } = result.data;
                const paymentWidget = paymentWidgetRef.current;

                paymentWidget?.requestPayment({
                    orderId,
                    orderName,
                    customerName: user.userNickname,
                    customerEmail: user.userEmail,
                    customerMobilePhone: user.userPhone,
                    successUrl: `${FRONT_ENDPOINT}buyers/pay-loading`,
                    failUrl: `${FRONT_ENDPOINT}buyers/pay`,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useAsync(async () => {
        // ------  결제위젯 초기화 ------
        const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제

        // ------  결제 UI 렌더링 ------
        // 결제 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
        // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            "#payment-widget",
            { value: amount },
            // 렌더링하고 싶은 결제 UI의 variantKey
            { variantKey: "DEFAULT" },
        );

        // ------  이용약관 UI 렌더링 ------
        // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
        paymentWidget.renderAgreement(
            "#agreement",
            { variantKey: "AGREEMENT" }, // 기본 이용약관 UI 렌더링
        );
        paymentWidgetRef.current = paymentWidget;
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
    }, []);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

        // ------ 금액 업데이트 ------
        // 새로운 결제 금액을 넣어주세요.
        paymentMethodsWidget.updateAmount(amount);
    }, [amount]);

    return (
        <>
            <Head>
                <title>캐시카우 충전하기</title>
                <meta
                    name="description"
                    content="쑈잇에서 사용하실 수 있는 화폐, '캐시카우'를 충전하실 수 있는 페이지입니다."
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <PaymentContainer>
                <SelectAmountContainer>
                    <CashChargeWrapper>캐시카우 충전</CashChargeWrapper>
                    <RadioButtonContainer>
                        <HorizontalLine />
                        <RadioButtonBox>
                            <RadioButtons>
                                <RadioButton
                                    width="100%"
                                    id="1"
                                    name="payment"
                                    value="5000"
                                    radioName="￦5,000"
                                    iconURL="/assets/icons/cashcow-coin-icon.svg"
                                    onClick={() => {
                                        setSelectedValue("5,000");
                                        setAmount(5000);
                                    }}
                                    defaultCheck
                                />
                                <RadioButton
                                    width="100%"
                                    id="2"
                                    name="payment"
                                    value="10000"
                                    radioName="￦10,000"
                                    iconURL="/assets/icons/cashcow-coin-icon.svg"
                                    onClick={() => {
                                        setSelectedValue("10,000");
                                        setAmount(10000);
                                    }}
                                />
                                <RadioButton
                                    width="100%"
                                    id="3"
                                    name="payment"
                                    value="20000"
                                    radioName="￦20,000"
                                    iconURL="/assets/icons/cashcow-coin-icon.svg"
                                    onClick={() => {
                                        setSelectedValue("20,000");
                                        setAmount(20000);
                                    }}
                                />
                                <RadioButton
                                    width="100%"
                                    id="4"
                                    name="payment"
                                    value="30000"
                                    radioName="￦30,000"
                                    iconURL="/assets/icons/cashcow-coin-icon.svg"
                                    onClick={() => {
                                        setSelectedValue("30,000");
                                        setAmount(30000);
                                    }}
                                />
                                <RadioButton
                                    width="100%"
                                    id="4"
                                    name="payment"
                                    value="50000"
                                    radioName="￦50,000"
                                    iconURL="/assets/icons/cashcow-coin-icon.svg"
                                    onClick={() => {
                                        setSelectedValue("50,000");
                                        setAmount(50000);
                                    }}
                                />
                            </RadioButtons>
                            <RadioButtons>
                                <RadioButton
                                    width="100%"
                                    id="6"
                                    name="payment"
                                    value="100000"
                                    radioName="￦100,000"
                                    iconURL="/assets/icons/cashcow-coin-icon.svg"
                                    onClick={() => {
                                        setSelectedValue("100,000");
                                        setAmount(100000);
                                    }}
                                />
                                <RadioButton
                                    width="100%"
                                    id="7"
                                    name="payment"
                                    value="200000"
                                    radioName="￦200,000"
                                    iconURL="/assets/icons/cashcow-coin-icon.svg"
                                    onClick={() => {
                                        setSelectedValue("200,000");
                                        setAmount(200000);
                                    }}
                                />
                                <RadioButton
                                    width="100%"
                                    id="8"
                                    name="payment"
                                    value="300000"
                                    radioName="￦300,000"
                                    iconURL="/assets/icons/cashcow-coin-icon.svg"
                                    onClick={() => {
                                        setSelectedValue("300,000");
                                        setAmount(300000);
                                    }}
                                />
                                <RadioButton
                                    width="100%"
                                    id="9"
                                    name="payment"
                                    value="500000"
                                    radioName="￦500,000"
                                    iconURL="/assets/icons/cashcow-coin-icon.svg"
                                    onClick={() => {
                                        setSelectedValue("500,000");
                                        setAmount(500000);
                                    }}
                                />
                                <RadioButton
                                    width="100%"
                                    id="10"
                                    name="payment"
                                    value="1000000"
                                    radioName="￦1,000,000"
                                    iconURL="/assets/icons/cashcow-coin-icon.svg"
                                    onClick={() => {
                                        setSelectedValue("1,000,000");
                                        setAmount(1000000);
                                    }}
                                />
                            </RadioButtons>
                        </RadioButtonBox>
                        <HorizontalLine />
                    </RadioButtonContainer>
                    <TotalAmountWrapper>
                        <TotalAmountText>총 결제 금액</TotalAmountText>
                        <TotalAmountText>￦{selectedValue}</TotalAmountText>
                    </TotalAmountWrapper>
                </SelectAmountContainer>
                <BuyerInfoContainer>
                    <BuyerInfoTitleWrapper>바이어 정보</BuyerInfoTitleWrapper>
                    <BuyerInfoTextBox>
                        <BuyerInfoTextWrapper>
                            <BuyerInfoTextLeft>닉네임</BuyerInfoTextLeft>
                            <BuyerInfoTextRight>{user.userNickname}</BuyerInfoTextRight>
                        </BuyerInfoTextWrapper>
                        <BuyerInfoTextWrapper>
                            <BuyerInfoTextLeft>보유 포인트</BuyerInfoTextLeft>
                            <BuyerInfoTextRight>{formatPoint(currentPoint)} P</BuyerInfoTextRight>
                        </BuyerInfoTextWrapper>
                        <BuyerInfoTextWrapper>
                            <BuyerInfoTextLeft>결제 후 포인트</BuyerInfoTextLeft>
                            <BuyerInfoTextRight>{formatPoint(afterPoint)} P</BuyerInfoTextRight>
                        </BuyerInfoTextWrapper>
                    </BuyerInfoTextBox>
                </BuyerInfoContainer>
                <PaymentWidget id="payment-widget" />
                <Agreement id="agreement" />
                <TextButton
                    width="15%"
                    type="button"
                    text="결제"
                    curve="curved"
                    fontSize={27}
                    onClick={handlePayment}
                />
            </PaymentContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const PaymentWithAuth = withAuth({ WrappedComponent: Payment, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
PaymentWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default PaymentWithAuth;
