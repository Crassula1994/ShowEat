/* Import */
import SingleLayout from "@layouts/SingleLayout";
import withAuth from "@libs/withAuth";
import { ReactNode } from "react";
import styled from "@emotion/styled";
import useUserState from "@hooks/useUserState";
import { TextButton } from "@components/common/button";
import { useRouter } from "next/router";
import Head from "next/head";

// ----------------------------------------------------------------------------------------------------

/* Style */
const Container = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin: 20px;
    height: 20vh;
`;

const BuyerInfoContainer = styled("div")`
    width: 50%;
    height: 25%;
    margin-bottom: 1%;
`;

const ReturnButtonWrapper = styled("div")`
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    display: flex;
`;

const BuyerInfoTitleWrapper = styled("div")`
    margin-bottom: 5%;
    color: green;

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
    gap: 30px;
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
    width: 450px;
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

// ----------------------------------------------------------------------------------------------------

/* Buyer Pay Result Page */
function PayResult() {
    const [user] = useUserState();
    const router = useRouter();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const approvedAt: string | null = urlParams.get("approvedAt");
    const balanceAmount: string | null = urlParams.get("balanceAmount");
    const method: string | null = urlParams.get("method");
    const orderId: string | null = urlParams.get("orderId");

    // approvedAt이 문자열인 경우 Date 객체로 변환
    const approvedAtDate = approvedAt ? new Date(approvedAt) : null;

    // Date 객체를 포맷에 맞게 변환
    const formattedApprovedAt =
        approvedAtDate?.toLocaleString("ko-KR", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        }) ?? "날짜 없음";

    // 포인트를 ,000 형식으로 포맷하는 함수
    const formatPoint = (point: number) => {
        return point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const formatPointString = (point: string) => {
        return point.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <>
            <Head>
                <title>충전 완료</title>
                <meta name="description" content="요청하신 캐시카우를 충전 완료되었습니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Container>
                <BuyerInfoContainer>
                    <BuyerInfoTitleWrapper>결제가 완료되었습니다.</BuyerInfoTitleWrapper>
                    <BuyerInfoTextBox>
                        <BuyerInfoTextWrapper>
                            <BuyerInfoTextLeft>주문 완료 시각</BuyerInfoTextLeft>
                            <BuyerInfoTextRight>{formattedApprovedAt}</BuyerInfoTextRight>
                        </BuyerInfoTextWrapper>
                        <BuyerInfoTextWrapper>
                            <BuyerInfoTextLeft>결제 금액</BuyerInfoTextLeft>
                            <BuyerInfoTextRight>
                                {balanceAmount !== null ? formatPointString(balanceAmount) : "N/A"}
                                원
                            </BuyerInfoTextRight>
                        </BuyerInfoTextWrapper>
                        <BuyerInfoTextWrapper>
                            <BuyerInfoTextLeft>결제 수단</BuyerInfoTextLeft>
                            <BuyerInfoTextRight>{method}</BuyerInfoTextRight>
                        </BuyerInfoTextWrapper>
                        <BuyerInfoTextWrapper>
                            <BuyerInfoTextLeft>주문 번호</BuyerInfoTextLeft>
                            <BuyerInfoTextRight>{orderId}</BuyerInfoTextRight>
                        </BuyerInfoTextWrapper>
                        <BuyerInfoTextWrapper>
                            <BuyerInfoTextLeft>결제 후 포인트</BuyerInfoTextLeft>
                            <BuyerInfoTextRight>
                                {formatPoint(
                                    user.userMoney +
                                        (balanceAmount ? parseInt(balanceAmount, 10) : 0),
                                )}{" "}
                                P
                            </BuyerInfoTextRight>
                        </BuyerInfoTextWrapper>
                    </BuyerInfoTextBox>
                    <ReturnButtonWrapper>
                        <TextButton
                            text="돌아가기"
                            width="100px"
                            height="40px"
                            fontSize={20}
                            onClick={() => router.replace("/buyers/profile")}
                        />
                    </ReturnButtonWrapper>
                </BuyerInfoContainer>
            </Container>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const PayResultWithAuth = withAuth({ WrappedComponent: PayResult, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
PayResultWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default PayResultWithAuth;
