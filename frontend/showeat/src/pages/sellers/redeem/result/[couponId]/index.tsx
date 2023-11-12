/* Import */
import SingleLayout from "@layouts/SingleLayout";
import withAuth from "@libs/withAuth";
import { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Table from "@components/common/table";
import { getCouponDetails, patchUseCoupon, patchUseGiftcard } from "@apis/coupons";
import { CouponType } from "@customTypes/apiProps";
import { LoginButton, TextButton } from "@components/common/button";
import { useRouter } from "next/router";
import Modal from "@components/composite/modal";
import { formatMoney } from "@/utils/format";
import { TextInput } from "@/components/common/input";
import useUserState from "@/hooks/useUserState";

// ----------------------------------------------------------------------------------------------------

/* Style */
const RedeemResultContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 800px;
    height: 100%;
`;

const TitleContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2em;
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

const ContentContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 500px;
    height: 350px;

    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 20px;
`;

const SellerInfoContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 1em 0;
`;

const SellerNameContainer = styled("span")`
    font-size: 16px;
    color: ${(props) => props.theme.colors.gray4};
`;

const MenuNameContainer = styled("span")`
    font-size: 22px;
    font-weight: 700;
`;

const TableContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 80%;
    /* height: 300px; */
`;

const MoneyInputContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 80%;
`;

const InputLabelWrapper = styled("label")`
    display: flex;
    align-items: center;

    width: 30%;

    font-size: 16px;
    font-weight: 700;

    padding: 1em;
    box-sizing: border-box;
`;

const InputWrapper = styled("div")`
    display: flex;
    align-items: center;

    width: 70%;

    padding: 0 1em;
    box-sizing: border-box;
`;

const ButtonContainer = styled("div")`
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 500px;

    padding: 2em;
`;

const MultiModalContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const MultiModalTitleWrapper = styled("span")`
    font-size: 30px;
    font-weight: 700;

    padding: 0.5em;
`;

const MultiModalDescriptionWrapper = styled("span")`
    font-size: 18px;

    padding: 2em;
`;

const LoginModalContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const LoginModalTitleWrapper = styled("span")`
    font-size: 30px;
    font-weight: 700;

    padding: 1em;
`;

const LoginButtonContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Login Modal Component */
function LoginModal() {
    // States and Variables
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    // Function for Redirecting to Kakao Login Page
    const handleKakaoLogin = () => {
        const KAKAO_BASE_URL: string = "https://kauth.kakao.com/oauth/authorize";
        const currentUrl = window.location.pathname;
        window.location.href = `${KAKAO_BASE_URL}?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&state=${currentUrl}`;
    };
    return (
        <LoginModalContainer>
            <LoginModalTitleWrapper>로그인이 필요합니다.</LoginModalTitleWrapper>
            <LoginButtonContainer>
                <LoginButton
                    width="25%"
                    onClick={handleKakaoLogin}
                    colorType="kakao"
                    text="카카오로 시작하기"
                />
                <LoginButton width="25%" colorType="google" text="구글로 시작하기" />
            </LoginButtonContainer>
        </LoginModalContainer>
    );
}

/* Falied Modal Component */
function MultiModal(isStatus: string) {
    const renderText = [
        {
            status: "SUCCESS",
            title: "사용 처리 완료",
            description: "성공적으로 처리 완료했습니다.",
        },
        {
            status: "EXPIRED",
            title: "사용 기한 만료",
            description: "사용 기한이 만료된 쿠폰입니다.",
        },
        {
            status: "USED",
            title: "사용 완료",
            description: "이미 사용 완료한 쿠폰입니다.",
        },
        {
            status: "FAILEDLOAD",
            title: "불러오기 실패",
            description: "데이터 불러오기에 실패했습니다.",
        },
        {
            status: "NONEDATA",
            title: "쿠폰 없음",
            description: "해당하는 쿠폰 데이터가 없습니다.",
        },
        {
            status: "REQUIREMONEY",
            title: "금액 필요",
            description: "차감할 금액을 입력해주세요.",
        },
        {
            status: "UNKNOWN",
            title: "알 수 없는 오류",
            description: "개발진에게 문의 해주세요.",
        },
    ];
    return (
        <MultiModalContainer>
            <MultiModalTitleWrapper>
                {renderText.find((text) => text.status === isStatus)?.title}
            </MultiModalTitleWrapper>
            <MultiModalDescriptionWrapper>
                {renderText.find((text) => text.status === isStatus)?.description}
            </MultiModalDescriptionWrapper>
        </MultiModalContainer>
    );
}

/* Seller Redeem Result Page */
function RedeemResult() {
    const router = useRouter();
    const [couponData, setCouponData] = useState<CouponType | null>(null);
    const [isMultiModalOpen, setIsMultiModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isStatus, setIsStatus] = useState<string>("UNKNOWN");
    const [isUseMoney, setIsUseMoney] = useState("");
    const [user] = useUserState();

    useEffect(() => {
        const { couponId } = router.query;

        if (typeof couponId === "string") {
            getCouponDetails(parseFloat(couponId)).then((res) => {
                if (!res.data) {
                    setIsStatus("FAILEDLOAD");
                    setIsMultiModalOpen(true);
                } else {
                    setCouponData(res.data);
                }
            });
        }
    }, [router.query, user]);

    const isSingleCoupon = couponData?.couponType === "SINGLE";
    const tableHeaders: string[] = [
        "펀딩명",
        "유효 기간",
        isSingleCoupon ? "메뉴 가격" : "금액권 잔액",
        isSingleCoupon && "구입 가격",
    ]
        .filter(Boolean)
        .map((item) => item as string);

    const tableContents: (string | number)[] = [
        couponData?.fundingTitle || "데이터가 없습니다.",
        couponData?.expirationDate || "데이터가 없습니다.",
        isSingleCoupon
            ? formatMoney(couponData?.fundingPrice || 0) || "데이터가 없습니다."
            : formatMoney(couponData?.couponPrice || 0) || "데이터가 없습니다.",
        isSingleCoupon &&
            (formatMoney(couponData?.fundingDiscountPrice || 0) || "데이터가 없습니다."),
    ].map((item) => item as string | number);

    const changeUseMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d+$/.test(newValue) || newValue === "") {
            if (parseFloat(newValue) <= (couponData?.couponPrice || 0) || newValue === "") {
                setIsUseMoney(newValue);
            }
        }
    };

    const handleUseCoupon = () => {
        if (couponData) {
            if (couponData.couponStatus === "ACTIVE") {
                if (couponData.couponType === "SINGLE") {
                    patchUseCoupon(couponData.couponId).then(() => {
                        setIsStatus("SUCCESS");
                        setIsMultiModalOpen(true);
                        setTimeout(() => {
                            router.replace("/sellers/redeem");
                        }, 2000);
                    });
                } else if (parseFloat(isUseMoney) > 0) {
                    patchUseGiftcard({
                        couponId: couponData.couponId,
                        couponAmount: parseFloat(isUseMoney),
                    }).then(() => {
                        setIsStatus("SUCCESS");
                        setIsMultiModalOpen(true);
                        setTimeout(() => {
                            router.replace("/sellers/redeem");
                        }, 2000);
                    });
                } else {
                    setIsStatus("REQUIREMONEY");
                    setIsMultiModalOpen(true);
                }
            } else if (couponData.couponStatus === "EXPIRED") {
                setIsStatus("EXPIRED");
                setIsMultiModalOpen(true);
            } else if (couponData.couponStatus === "USED") {
                setIsStatus("USED");
                setIsMultiModalOpen(true);
            } else {
                setIsStatus("UNKNOWN");
                setIsMultiModalOpen(true);
            }
        } else {
            setIsStatus("NONEDATA");
            setIsMultiModalOpen(true);
        }
    };

    const handleLogin = () => {
        setIsLoginModalOpen(true);
    };

    return (
        <RedeemResultContainer>
            <TitleContainer>
                <TitleWrapper>발급한 쿠폰으로 결제하기</TitleWrapper>
                <DescriptionWrapper>발급한 쿠폰 정보가 맞는지 확인해주세요.</DescriptionWrapper>
            </TitleContainer>
            <ContentContainer>
                <SellerInfoContainer>
                    <SellerNameContainer>야미화니 커피</SellerNameContainer>
                    <MenuNameContainer>카페라떼</MenuNameContainer>
                </SellerInfoContainer>
                <TableContainer>
                    <Table
                        headers={tableHeaders}
                        contents={tableContents}
                        headerWidth="30%"
                        gap="1em"
                    />
                </TableContainer>
                {couponData?.couponType === "GIFTCARD" && (
                    <MoneyInputContainer>
                        <InputLabelWrapper htmlFor="use-money">사용 금액</InputLabelWrapper>
                        <InputWrapper>
                            <TextInput
                                value={isUseMoney}
                                width="100%"
                                id="use-money"
                                unit="원"
                                required
                                onChange={(e) => changeUseMoney(e)}
                            />
                        </InputWrapper>
                    </MoneyInputContainer>
                )}
            </ContentContainer>
            <ButtonContainer>
                {user.userId ? (
                    <TextButton
                        text="쿠폰 결제"
                        width="200px"
                        height="50px"
                        fontSize={20}
                        onClick={handleUseCoupon}
                    />
                ) : (
                    <TextButton
                        text="로그인"
                        width="200px"
                        height="50px"
                        fontSize={20}
                        onClick={handleLogin}
                    />
                )}

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
                childComponent={MultiModal(isStatus)}
                width="500px"
                height="300px"
                isOpen={isMultiModalOpen}
                setIsOpen={setIsMultiModalOpen}
                buttonType="close"
                buttonWidth="200px"
                buttonHeight="50px"
                buttonFontSize={20}
            />

            <Modal
                childComponent={LoginModal()}
                width="500px"
                height="300px"
                isOpen={isLoginModalOpen}
                setIsOpen={setIsLoginModalOpen}
                buttonType="none"
                buttonWidth="200px"
                buttonHeight="50px"
                buttonFontSize={20}
            />
        </RedeemResultContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const RedeemResultWithAuth = withAuth({
    WrappedComponent: RedeemResult,
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
RedeemResultWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default RedeemResultWithAuth;
