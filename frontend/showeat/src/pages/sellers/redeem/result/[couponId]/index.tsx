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
import { formatMoney } from "@utils/format";
import { TextInput } from "@components/common/input";
import useUserState from "@hooks/useUserState";
import Head from "next/head";
import useSellerState from "@hooks/useSellerState";
import { deleteCookie } from "cookies-next";

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

    @media (max-width: 767px) {
        width: 100%;
        min-width: auto;
        height: 100%;
    }
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

    @media (max-width: 767px) {
        font-size: 26px;
    }
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

    box-sizing: border-box;

    @media (max-width: 767px) {
        width: 90%;
        min-width: auto;
        height: 100%;
        min-height: 300px;
    }
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

    @media (max-width: 767px) {
        width: 90%;
    }
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

    @media (max-width: 767px) {
        font-size: 12px;
    }
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

    @media (max-width: 767px) {
        flex-direction: column;

        width: 100%;
        min-width: auto;
        height: 100%;

        padding: 3em 0;
        gap: 3em;
    }
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

    padding: 2em 0;

    @media (max-width: 767px) {
        font-size: 14px;
    }
`;

const SuccessModalDescriptionWrapper = styled("span")`
    font-size: 22px;
    font-weight: 700;

    padding: 3em 0;

    @media (max-width: 767px) {
        font-size: 14px;
    }
`;

const SuccessModalButtonContainer = styled("span")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 90%;
    height: 50px;

    box-sizing: border-box;
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

    padding-bottom: 2em;
`;

// ----------------------------------------------------------------------------------------------------

/* Login Modal Component */
function LoginModal() {
    // States and Variables
    const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    const [, setSeller] = useSellerState();

    // Function for Redirecting to Kakao Login Page
    const handleKakaoLogin = () => {
        setSeller((prev) => ({
            ...prev,
            isLoginTry: true,
        }));
        const KAKAO_BASE_URL: string = "https://kauth.kakao.com/oauth/authorize";
        window.location.href = `${KAKAO_BASE_URL}?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
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
        {
            status: "NONEBUSINESS",
            title: "잘못된 접근",
            description: "해당 쿠폰을 발행한 셀러가 아니예요!",
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

function SuccessModal() {
    const router = useRouter();
    const goSeller = () => {
        router.replace("/sellers/profile/seller-info");
    };
    const goMain = () => {
        router.replace("/");
    };

    return (
        <MultiModalContainer>
            <SuccessModalDescriptionWrapper>
                성공적으로 처리 완료됐습니다.
            </SuccessModalDescriptionWrapper>
            <SuccessModalButtonContainer>
                <TextButton
                    text="셀러 페이지로"
                    width="180px"
                    height="40px"
                    onClick={() => goSeller()}
                />
                <TextButton text="메인으로" width="180px" height="40px" onClick={() => goMain()} />
            </SuccessModalButtonContainer>
        </MultiModalContainer>
    );
}

/* Seller Redeem Result Page */
function RedeemResult() {
    const router = useRouter();
    const [couponData, setCouponData] = useState<CouponType | null>(null);
    const [isMultiModalOpen, setIsMultiModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isStatus, setIsStatus] = useState<string>("UNKNOWN");
    const [isUseMoney, setIsUseMoney] = useState("");
    const [user] = useUserState();
    const [, setSeller] = useSellerState();

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

        if (user.userId === 0) {
            setSeller((prev) => ({
                ...prev,
                couponUrl: `/sellers/redeem/result/${couponId}`,
            }));
        } else {
            setSeller((prev) => ({
                ...prev,
                couponUrl: "",
            }));
        }
    }, [router.query, user]);

    const isSingleCoupon = couponData?.couponType === "SINGLE";
    const tableHeaders =
        couponData &&
        [
            "펀딩명",
            "유효 기간",
            isSingleCoupon ? "메뉴 가격" : "쿠폰 잔액",
            isSingleCoupon && "구입 가격",
        ]

            .filter(Boolean)
            .map((item) => item as string);

    const tableContents = [
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
                    patchUseCoupon(couponData.couponId).then((res) => {
                        if (res.statusCode === 200) {
                            setIsSuccessModalOpen(true);
                        } else if (res === 463) {
                            setIsStatus("NONEBUSINESS");
                            setIsMultiModalOpen(true);
                        } else {
                            setIsStatus("UNKNOWN");
                            setIsMultiModalOpen(true);
                        }
                    });
                } else if (parseFloat(isUseMoney) > 0) {
                    patchUseGiftcard({
                        couponId: couponData.couponId,
                        couponAmount: parseFloat(isUseMoney),
                    }).then((res) => {
                        if (res.statusCode === 200) {
                            setIsSuccessModalOpen(true);
                        } else if (res === 463) {
                            setIsStatus("NONEBUSINESS");
                            setIsMultiModalOpen(true);
                        } else {
                            setIsStatus("UNKNOWN");
                            setIsMultiModalOpen(true);
                        }
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
        deleteCookie("access-token");
        deleteCookie("refresh-token");
        setIsLoginModalOpen(true);
    };

    return (
        <>
            <Head>
                <title>쿠폰 결제</title>
                <meta name="description" content="쿠폰 결제 처리 페이지입니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <RedeemResultContainer>
                <TitleContainer>
                    <TitleWrapper>발급한 쿠폰으로 결제하기</TitleWrapper>
                    <DescriptionWrapper>발급한 쿠폰 정보가 맞는지 확인해주세요.</DescriptionWrapper>
                </TitleContainer>
                <ContentContainer>
                    <SellerInfoContainer>
                        {couponData && (
                            <SellerNameContainer>{couponData?.businessName}</SellerNameContainer>
                        )}

                        <MenuNameContainer>
                            {(couponData &&
                                (couponData?.couponType === "SINGLE"
                                    ? couponData?.fundingMenu
                                    : "금액권")) ||
                                "데이터를 찾지 못 했습니다."}
                        </MenuNameContainer>
                    </SellerInfoContainer>
                    <TableContainer>
                        {tableHeaders && (
                            <Table
                                headers={tableHeaders}
                                contents={tableContents}
                                headerWidth="30%"
                                gap="1em"
                            />
                        )}
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
            </RedeemResultContainer>
        </>
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
