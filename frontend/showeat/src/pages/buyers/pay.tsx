/* Import */
import { getUserInfo } from "@apis/users";
import Head from "next/head";
import { PaymentWidgetInstance, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { postRequestPayments } from "@apis/payments";
import { RadioButton } from "@components/common/input";
import React, { ReactNode, useState, useEffect, useRef } from "react";
import SingleLayout from "@layouts/SingleLayout";
import styled from "@emotion/styled";
import { TextButton } from "@components/common/button";
import { useAsync } from "react-use";
import useUserState from "@hooks/useUserState";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Variables */
const FRONT_ENDPOINT = process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT;
const CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;
const SECRET_KEY = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_SECRET_KEY;

// ----------------------------------------------------------------------------------------------------

/* Style */
const PaymentContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;

    // Box Model Attribute
    width: 100%;
    box-sizing: border-box;
    padding: 5% 10%;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const TitleWrapper = styled("div")`
    // Text Attribute
    font-weight: 700;
    font-size: 40px;
`;

const DescriptionWrapper = styled("div")`
    // Text Attribute
    color: ${(props) => props.theme.colors.gray4};
    font-size: 20px;
    b {
        font-size: 20px;
    }
`;

const PaymentBox = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;

    // Box Model Attribute
    width: 50%;
    margin-top: 3em;
`;

const Line = styled("div")`
    // Box Model Attribute
    width: 100%;
    height: 1px;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.gray2};
`;

const RadioButtonContainer = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    // Box Model Attribute
    width: 100%;
`;

const RadioButtonBox = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3em;

    // Box Model Attribute
    width: 25%;
    margin: 1em 0;
`;

const TotalAmountWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: space-between;

    // Box Model Attribute
    width: 100%;
    margin-bottom: 5em;
`;

const SubTitleWrapper = styled("div")`
    // Box Model Attribute
    width: 100%;
    margin-bottom: 1em;

    // Text Attribute
    font-size: 30px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.secondary3};
`;

const BuyerInfoTextBox = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 2em;

    // Box Model Attribute
    width: 100%;
    margin-bottom: 5em;
`;

const BuyerInfoTextWrapper = styled("div")`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BuyerInfoTextLeft = styled("div")`
    // Box Model Attribute
    width: 50%;

    // Text Attribute
    font-size: 24px;
    font-weight: 700;
`;

const BuyerInfoTextRight = styled("div")`
    // Box Model Attribute
    width: 50%;

    // Text Attribute
    text-align: right;
    font-size: 24px;
    b {
        font-size: 24px;
    }
`;

const TotalAmountText = styled("div")`
    font-size: 24px;
    font-weight: 700;
`;

const PaymentWidget = styled("div")`
    width: 100%;
`;

const Agreement = styled("div")`
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Payment Page */
function Payment() {
    // States and Variables
    const [user] = useUserState();
    const [selectedValue, setSelectedValue] = useState<string>("5,000");
    const [currentPoint, setCurrentPoint] = useState<number>(0);
    const [afterPoint, setAfterPoint] = useState<number>(0);
    const [amount, setAmount] = useState<number>(5000);
    const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
    const paymentMethodsWidgetRef = useRef<ReturnType<
        PaymentWidgetInstance["renderPaymentMethods"]
    > | null>(null);

    useEffect(() => {
        const { userId } = user;

        if (userId !== 0) {
            getUserInfo(userId).then((result) => {
                const { userMoney } = result.data;
                setCurrentPoint(userMoney);
            });
        }
    }, [user]);

    useEffect(() => {
        if (selectedValue) {
            const selectedAmount = parseInt(selectedValue.replace(/[^0-9]/g, ""), 10);
            if (!Number.isNaN(selectedAmount)) {
                setAfterPoint(currentPoint + selectedAmount);
            }
        }
    }, [selectedValue, currentPoint]);

    const formatPoint = (point: number) => {
        return point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // handlePayment 함수
    const handlePayment = () => {
        const payType = "CARD";
        const orderName = "캐시카우 포인트";

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
                throw error;
            });
    };

    useAsync(async () => {
        const paymentWidget = await loadPaymentWidget(CLIENT_KEY as string, SECRET_KEY as string);
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
            "#payment-widget",
            { value: amount },
            { variantKey: "DEFAULT" },
        );

        paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
        paymentWidgetRef.current = paymentWidget;
        paymentMethodsWidgetRef.current = paymentMethodsWidget;
    }, []);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

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
                <TitleWrapper>캐시카우 충전하기</TitleWrapper>
                <DescriptionWrapper>
                    <b>캐시카우</b>는 쑈잇에서 사용하실 수 있는 전용 포인트입니다.
                </DescriptionWrapper>
                <PaymentBox>
                    <SubTitleWrapper>충전금액 선택</SubTitleWrapper>
                    <Line />
                    <RadioButtonContainer>
                        <RadioButtonBox>
                            <RadioButton
                                width="100%"
                                id="1"
                                name="payment"
                                value="5000"
                                radioName="5,000"
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
                                radioName="10,000"
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
                                radioName="20,000"
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
                                radioName="30,000"
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
                                radioName="50,000"
                                iconURL="/assets/icons/cashcow-coin-icon.svg"
                                onClick={() => {
                                    setSelectedValue("50,000");
                                    setAmount(50000);
                                }}
                            />
                        </RadioButtonBox>
                        <RadioButtonBox>
                            <RadioButton
                                width="100%"
                                id="6"
                                name="payment"
                                value="100000"
                                radioName="100,000"
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
                                radioName="200,000"
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
                                radioName="300,000"
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
                                radioName="500,000"
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
                                radioName="1,000,000"
                                iconURL="/assets/icons/cashcow-coin-icon.svg"
                                onClick={() => {
                                    setSelectedValue("1,000,000");
                                    setAmount(1000000);
                                }}
                            />
                        </RadioButtonBox>
                    </RadioButtonContainer>
                    <Line />
                    <TotalAmountWrapper>
                        <TotalAmountText>총 결제 금액</TotalAmountText>
                        <TotalAmountText>￦{selectedValue}</TotalAmountText>
                    </TotalAmountWrapper>
                    <SubTitleWrapper>충전 정보 확인</SubTitleWrapper>
                    <Line />
                    <BuyerInfoTextBox>
                        <BuyerInfoTextWrapper>
                            <BuyerInfoTextLeft>닉네임</BuyerInfoTextLeft>
                            <BuyerInfoTextRight>{user.userNickname}</BuyerInfoTextRight>
                        </BuyerInfoTextWrapper>
                        <BuyerInfoTextWrapper>
                            <BuyerInfoTextLeft>보유 캐시카우</BuyerInfoTextLeft>
                            <BuyerInfoTextRight>
                                <b>{formatPoint(currentPoint)}</b>&nbsp; 캐시카우
                            </BuyerInfoTextRight>
                        </BuyerInfoTextWrapper>
                        <BuyerInfoTextWrapper>
                            <BuyerInfoTextLeft>결제 후 캐시카우</BuyerInfoTextLeft>
                            <BuyerInfoTextRight>
                                <b>{formatPoint(afterPoint)}</b>&nbsp; 캐시카우
                            </BuyerInfoTextRight>
                        </BuyerInfoTextWrapper>
                    </BuyerInfoTextBox>
                    <SubTitleWrapper>결제 수단 선택</SubTitleWrapper>
                    <Line />
                    <PaymentWidget id="payment-widget" />
                    <Agreement id="agreement" />
                    <TextButton
                        width="100%"
                        type="button"
                        text="캐시카우 충전"
                        curve="curved"
                        fontSize={20}
                        onClick={handlePayment}
                    />
                </PaymentBox>
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
