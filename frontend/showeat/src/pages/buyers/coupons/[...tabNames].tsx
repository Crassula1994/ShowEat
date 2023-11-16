/* Import */
import BuyerLayout from "@layouts/BuyerLayout";
import BuyersCouponsModal from "@components/custom/modal/BuyersCouponsModal";
import { buyersCouponsTabMenu } from "@configs/tabMenu";
import Coupon from "@components/composite/coupon";
import { CouponType } from "@customTypes/apiProps";
import { getCouponList } from "@apis/coupons";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Modal from "@components/composite/modal";
import { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Tab, TabBar } from "@components/composite/tabBar";
import { TextButton } from "@components/common/button";
import { useRouter } from "next/router";
import useUserState from "@hooks/useUserState";
import withAuth from "@libs/withAuth";
import CouponReviewModal from "@/components/custom/modal/CouponReviewModal";
import Head from "next/head";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface CouponsParams {
    tabNames?: string[];
}

interface CouponsTabProps {
    tabName: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const CouponContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    // Box Model Attribute
    width: 100%;
    min-width: 750px;
    height: calc(100vh - 80px);
    box-sizing: border-box;
    padding: 5em 10em;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const TitleWrapper = styled("div")`
    // Box Model Attribute
    margin-bottom: 1em;

    // Text Attribute
    font-size: 30px;
    font-weight: 900;
`;

const BlankList = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;

    // Box Model Attribute
    height: 100vh;
`;

const TextWrapper = styled("div")`
    // Text Attribute
    font-weight: 700;
    font-size: 30px;
    color: ${(props) => props.theme.colors.gray4};
    span {
        font-size: 30px;
        font-weight: 900;
        color: ${(props) => props.theme.colors.secondary3};
    }
`;

const CouponList = styled("div")`
    // Layout Attribute
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1em;
    @media (max-width: 1400px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 900px) {
        grid-template-columns: repeat(1, 1fr);
    }

    // Box Model Attribute
    padding: 1em;
    box-sizing: border-box;
`;

const ButtonWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: center;
    align-items: center;

    // Box Model Attribute
    width: 100%;
    box-sizing: border-box;
    margin-top: 2em;
    padding-bottom: 2em;
`;

// ----------------------------------------------------------------------------------------------------

/* Server Side Rendering */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // States and Variables
    const { tabNames } = params as CouponsParams;
    const allowedTabNames = buyersCouponsTabMenu.map((tab) => tab.id);

    if (!tabNames || !allowedTabNames.includes(tabNames[0])) {
        return {
            redirect: {
                destination: "/error/not-found",
                permanent: false,
            },
        };
    }

    return {
        props: {
            tabName: tabNames?.[0],
        },
    };
};

// ----------------------------------------------------------------------------------------------------

/* Buyers Coupons Tab Page */
function CouponsTab(props: CouponsTabProps) {
    // States and Variables
    const { tabName } = props;
    const router = useRouter();
    const [user] = useUserState();
    const [activeTab, setActiveTab] = useState<string>(tabName || "active");
    const [couponData, setCouponData] = useState<CouponType[]>([]);
    const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);
    const [page, setPage] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [hasMorePage, setHasMorePage] = useState<boolean>(false);
    const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);

    // Function for Handling Tab Click
    const handleTabClick = (id: string, redirectUrl: string) => {
        setActiveTab(id);
        setPage(0);
        router.push(redirectUrl, undefined, { shallow: true });
    };

    // Function for Getting Tab Label Text
    const getTabLabelText = () => {
        return buyersCouponsTabMenu.find((tab) => tab.id === activeTab)?.labelText || "";
    };

    // Function for Handling Load More Coupon Button Click
    const handleLoadCoupon = () => {
        setPage(page + 1);
    };

    // Function for Opening Modal
    const openModal = (coupon: CouponType) => {
        setSelectedCoupon(coupon);
        setIsModalOpen(true);
    };

    const openReviewModal = () => {
        setReviewModalOpen(true);
    };

    const closeReviewModal = () => {
        setReviewModalOpen(false);
    };

    useEffect(() => {
        const { userId } = user;
        const status: string = activeTab.toUpperCase();
        if (userId !== 0) {
            getCouponList(userId, status, page).then((result) => {
                if (result.statusCode === 200) {
                    const isLastPage: boolean = result.data.last;
                    const couponList: CouponType[] = result.data.couponResponseDtos || [];
                    if (page === 0) {
                        setCouponData(couponList);
                        setHasMorePage(!isLastPage);
                    } else {
                        setCouponData([...couponData, ...couponList]);
                        setHasMorePage(!isLastPage);
                    }
                } else {
                    setCouponData([]);
                    setHasMorePage(false);
                }
            });
        }
    }, [activeTab, page, user]);

    return (
        <>
            <Head>
                <title>내 {tabName} 쿠폰</title>
                <meta name="description" content="바이어님께서 보유하신 쿠폰 목록입니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <CouponContainer>
                <TitleWrapper>보유 쿠폰</TitleWrapper>
                <TabBar>
                    {buyersCouponsTabMenu.map((tab) => (
                        <Tab
                            key={tab.id}
                            width="20%"
                            labelText={tab.labelText}
                            isActive={activeTab === tab.id}
                            onClick={() => handleTabClick(tab.id, tab.redirectUrl)}
                        />
                    ))}
                </TabBar>
                {couponData.length === 0 ? (
                    <BlankList>
                        <Image
                            src="/assets/images/crying-cook-cow.png"
                            width={150}
                            height={150}
                            alt="crying-cook-cow"
                            priority
                        />
                        <TextWrapper>
                            보유 중인 <span>{getTabLabelText()}</span> 쿠폰이 없소!
                        </TextWrapper>
                    </BlankList>
                ) : (
                    <CouponList>
                        {couponData.map((coupon, index) => (
                            <Coupon key={index} coupon={coupon} onClick={() => openModal(coupon)} />
                        ))}
                    </CouponList>
                )}
                {hasMorePage && (
                    <ButtonWrapper>
                        <TextButton
                            width="200px"
                            onClick={handleLoadCoupon}
                            text="쿠폰 더 보기"
                            curve="round"
                        />
                    </ButtonWrapper>
                )}
                {selectedCoupon && (
                    <Modal
                        width="auto"
                        height="auto"
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                        childComponent={<BuyersCouponsModal coupon={selectedCoupon} />}
                        onSubmit={() => openReviewModal()}
                        buttonType={
                            selectedCoupon.couponStatus === "USED" &&
                            !selectedCoupon.writeCouponReview
                                ? "review"
                                : "close"
                        }
                        buttonWidth="150px"
                    />
                )}
                {selectedCoupon && (
                    <Modal
                        width="auto"
                        height="auto"
                        isOpen={reviewModalOpen}
                        setIsOpen={setReviewModalOpen}
                        childComponent={
                            <CouponReviewModal
                                closeReviewModal={closeReviewModal}
                                couponId={selectedCoupon.couponId}
                                setCouponData={setCouponData}
                                setSelectedCoupon={setSelectedCoupon}
                            />
                        }
                        buttonType="none"
                        buttonWidth="150px"
                    />
                )}
            </CouponContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const CouponsTabWithAuth = withAuth({ WrappedComponent: CouponsTab, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
CouponsTabWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default CouponsTabWithAuth;
