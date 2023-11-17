/* Import */
import Head from "next/head";
import Image from "next/image";
import { getUserInfo } from "@apis/users";
import { ReactNode, useEffect } from "react";
import SingleLayout from "@layouts/SingleLayout";
import styled from "@emotion/styled";
import Table from "@components/common/table";
import { TextButton } from "@components/common/button";
import { useRouter } from "next/router";
import useUserState from "@hooks/useUserState";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Style */
const PayResultContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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

const HeaderContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
`;

const TitleWrapper = styled("div")`
    // Text Attribute
    color: ${(props) => props.theme.colors.normalGreen};
    font-size: 30px;
    font-weight: 700;
`;

const ContentContainer = styled("div")`
    // Box Model Attribute
    width: 50%;
    box-sizing: border-box;
    padding: 1em 2em;
    margin: 1em 0;

    // Style Attribute
    border: 1px solid ${(props) => props.theme.colors.gray2};
    border-radius: 20px;
`;

const ButtonWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: center;
    align-items: center;

    // Box Model Attribute
    width: 50%;
`;

// ----------------------------------------------------------------------------------------------------

/* Buyer Pay Result Page */
function PayResult() {
    const [user, setUser] = useUserState();
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

    const formatPoint = (point: number) => {
        return point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const formatPointString = (point: string) => {
        return point.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const formattedPointString: string =
        balanceAmount !== null ? formatPointString(balanceAmount) : "N/A";

    useEffect(() => {
        if (balanceAmount === null) {
            router.replace("/buyers/pay");
        }
    }, []);

    useEffect(() => {
        const { userId } = user;

        if (userId !== 0) {
            getUserInfo(userId).then((result) => {
                const { userMoney } = result.data;
                setUser((prevState) => ({ ...prevState, userMoney }));
            });
        }
    }, [user]);

    return (
        <>
            <Head>
                <title>충전 완료</title>
                <meta name="description" content="요청하신 캐시카우를 충전 완료되었습니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <PayResultContainer>
                <HeaderContainer>
                    <Image
                        src="/assets/images/happy-cook-cow.png"
                        width={150}
                        height={150}
                        alt="happy-cook-cow"
                    />
                    <TitleWrapper>충전이 완료되었소!</TitleWrapper>
                </HeaderContainer>
                <ContentContainer>
                    <Table
                        headerWidth="30%"
                        headers={[
                            "주문 완료 시각",
                            "결제 금액",
                            "결제 수단",
                            "주문번호",
                            "결제 후 캐시카우",
                        ]}
                        contents={[
                            `${formattedApprovedAt}`,
                            `${formattedPointString}`,
                            `${method}`,
                            `${orderId}`,
                            `${formatPoint(user.userMoney)} 캐시카우`,
                        ]}
                        contentAlign="right"
                    />
                </ContentContainer>
                <ButtonWrapper>
                    <TextButton
                        text="이전 페이지로 돌아가기"
                        width="50%"
                        fontSize={20}
                        onClick={() => router.replace("/")}
                    />
                </ButtonWrapper>
            </PayResultContainer>
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
