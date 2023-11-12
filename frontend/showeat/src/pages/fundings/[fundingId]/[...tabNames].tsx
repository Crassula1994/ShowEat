/* Import */
import { calcExpiryDate, calcRemainTime, formatDate, formatMoney } from "@utils/format";
import {
    FundingCancelErrorModal,
    FundingCancelModal,
    FundingShareModal,
} from "@components/custom/modal";
import { fundingTabMenu } from "@configs/tabMenu";
import { FundingStoreTab } from "@components/custom/tab";
import { BusinessType, FundingType } from "@customTypes/apiProps";
import {
    deleteFundingJoin,
    getFundingDetail,
    getFundingUserDetail,
    getSellerActiveFunding,
    postFundingJoin,
} from "@apis/fundings";
import getBusinessInfo from "@apis/business";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { HeartBlankIcon, HeartFullIcon, ShareIcon } from "public/assets/icons";
import ImageGallery from "@components/composite/imageGallery";
import MainLayout from "@layouts/MainLayout";
import Modal from "@components/composite/modal";
import menuCategoryList from "@configs/menuCategoryList";
import postBookmark from "@apis/bookmark";
import { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Tab, TabBar } from "@components/composite/tabBar";
import { TagButton, TextButton } from "@components/common/button";
import TextBox from "@components/common/textBox";
import { useRouter } from "next/router";
import useUserState from "@hooks/useUserState";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface FundingParams {
    fundingId?: string;
    tabNames?: string[];
}

interface FundingTabProps {
    businessData: BusinessType;
    businessFundingData: FundingType[];
    fundingId: string;
    fundingData: FundingType;
    tabName: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const FundingContainer = styled("div")`
    width: 100vw;
    box-sizing: border-box;
    padding: 5% 15%;
`;

const DetailContainer = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 2em;

    // Box Model Attribute
    margin-bottom: 5em;
`;

const ImageContainer = styled("div")`
    // Box Model Attribute
    width: 50%;
`;

const DetailBox = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5em;

    // Box Model Attribute
    width: 50%;
`;

const InfoHeaderContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    gap: 1em;

    // Box Model Attribute
    width: 100%;
`;

const CategoryWrapper = styled("div")`
    // Text Attribute
    font-size: 18px;
    b {
        font-size: 18px;
    }
`;

const TitleWrapper = styled("div")`
    // Text Attribute
    font-size: 30px;
    font-weight: 700;
`;

const TagContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
`;

const Line = styled("div")`
    // Box Model Attribute
    width: 100%;
    height: 1px;

    // Style Attribute
    border: none;
    background-color: ${(props) => props.theme.colors.gray2};
`;

const InfoContentContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    // Box Model Attribute
    width: 100%;
`;

const InfoContentBox = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PriceContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    // Box Model Attribute
    width: 100%;
`;

const OriginalPriceWrapper = styled("div")`
    // Box Model Attribute
    width: 100%;

    // Text Attribute
    font-size: 20px;
    color: ${(props) => props.theme.colors.gray4};
    text-decoration: line-through;
    text-align: right;
`;

const FundingPriceBox = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: space-between;

    // Box Model Attribute
    width: 100%;
`;

const FundingPriceWrapper = styled("div")`
    // Text Attribute
    font-size: 30px;
    font-weight: 900;
`;

const ButtonContainer = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: space-between;

    // Box Model Attribute
    width: 100%;
`;

const TabContainer = styled("div")`
    // Box Model Attribute
    width: 100%;
    margin-top: 5em;
`;

const ModalContainer = styled("div")`
    // Box Model Attribute
    width: 0;
    height: 0;
`;

// ----------------------------------------------------------------------------------------------------

/* Server Side Rendering */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // States and Variables
    const { fundingId, tabNames } = params as FundingParams;
    const allowedTabNames = fundingTabMenu.map((tab) => tab.id);

    if (!fundingId || !tabNames || !allowedTabNames.includes(tabNames[0])) {
        return {
            redirect: {
                destination: "/error/not-found",
                permanent: false,
            },
        };
    }

    const fundingResult = await getFundingDetail(fundingId);
    const fundingData: FundingType = { fundingId: +fundingId, ...fundingResult.data };

    const businessResult = await getBusinessInfo(fundingData.businessId);
    const businessData: BusinessType = businessResult.data;
    // console.log(businessResult);
    // console.log(businessResult.data.sellerMenuResponseDtos);
    businessData.businessAddress = "서울특별시 강남구 역삼동 테헤란로 212";

    const businessFundingResult = await getSellerActiveFunding(0);
    const businessFundingData: FundingType[] = businessFundingResult.data;

    return {
        props: {
            businessData,
            businessFundingData,
            fundingId,
            fundingData,
            tabName: tabNames?.[0],
        },
    };
};

// ----------------------------------------------------------------------------------------------------

/* Funding Tab Page */
function FundingTab(props: FundingTabProps) {
    // States and Variables
    const { businessData, businessFundingData, fundingId, fundingData, tabName } = props;
    const router = useRouter();
    const [user] = useUserState();
    const {
        title,
        category,
        maxLimit,
        minLimit,
        curCount,
        menu,
        price,
        discountPrice,
        discountRate,
        description,
        startDate,
        endDate,
        fundingIsActive,
        fundingIsSuccess,
        fundingTagResponseDtos,
        fundingImageResponseDtos,
        bookmarkCount,
    } = fundingData;
    const [activeTab, setActiveTab] = useState<string>(tabName || "store");
    const [errorCode, setErrorCode] = useState<number>(0);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [isJoined, setIsJoined] = useState<boolean>(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
    const [isCancelErrorModalOpen, setIsCancelErrorModalOpen] = useState<boolean>(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

    // Function for Getting Menu Category Text
    const getCategoryValue = (categoryId: string) => {
        const targetCategory = menuCategoryList.find((item) => item.id === categoryId);

        return targetCategory ? targetCategory.value : "";
    };

    // Function for Opening Cancel Confirm Modal
    const openFundingCancelModal = () => {
        setIsCancelModalOpen(true);
    };

    // Function for Canceling Funding
    const cancelFunding = () => {
        deleteFundingJoin(fundingId).then((result) => {
            if (typeof result === "number") {
                setErrorCode(result);
                setIsCancelModalOpen(false);
                setIsCancelErrorModalOpen(true);
                return;
            }
            router.reload();
        });
    };

    // Function for Applying Funding
    const applyFunding = () => {
        postFundingJoin(fundingId).then(() => {
            router.reload();
        });
    };

    // Function for Removing Favorite Funding
    const handleFavorite = () => {
        postBookmark(fundingId).then(() => {
            router.reload();
        });
    };

    // Function for Handling Tab Click
    const handleTabClick = (id: string, redirectUrl: string) => {
        const newRedirectUrl = redirectUrl.replace("[fundingId]", `${fundingId}`);
        setActiveTab(id);
        router.push(newRedirectUrl, undefined, { shallow: true });
    };

    useEffect(() => {
        const { userId } = user;

        if (userId !== 0) {
            getFundingUserDetail(userId, fundingId).then((result) => {
                const { fundingIsZzim, fundingIsParticipate } = result.data;
                setIsFavorite(fundingIsZzim);
                setIsJoined(fundingIsParticipate);
            });
        }
    }, [user]);

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <FundingContainer>
                <DetailContainer>
                    <ImageContainer>
                        <ImageGallery
                            images={fundingImageResponseDtos.map((item) => item.imageUrl)}
                        />
                    </ImageContainer>
                    <DetailBox>
                        <InfoHeaderContainer>
                            <CategoryWrapper>
                                {getCategoryValue(category)}&nbsp;&nbsp; | &nbsp;&nbsp;<b>{menu}</b>
                            </CategoryWrapper>
                            <TitleWrapper>{title}</TitleWrapper>
                            <TagContainer>
                                {fundingTagResponseDtos.map((tag, index) => (
                                    <TagButton
                                        key={index}
                                        width="auto"
                                        text={`#...${tag.fundingTag}...`}
                                    />
                                ))}
                            </TagContainer>
                        </InfoHeaderContainer>
                        <Line />
                        <InfoContentContainer>
                            <InfoContentBox>
                                <div>
                                    <b>펀딩 진행 기간</b>&nbsp;&nbsp; | &nbsp;&nbsp;
                                    {formatDate(startDate)} ~ {formatDate(endDate)}
                                </div>
                                <TagButton
                                    width="auto"
                                    text={
                                        fundingIsActive === "ACTIVE"
                                            ? `마감까지 ...${calcRemainTime(endDate)}...`
                                            : `...펀딩 마감...`
                                    }
                                    colorType="secondary"
                                    textColor="white"
                                />
                            </InfoContentBox>
                            <InfoContentBox>
                                <div>
                                    <b>쿠폰 만료 기간</b>&nbsp;&nbsp; | &nbsp;&nbsp;펀딩
                                    완료일로부터 180일
                                </div>
                                <TagButton
                                    width="auto"
                                    text={
                                        fundingIsActive === "ACTIVE"
                                            ? `...${formatDate(calcExpiryDate(endDate))}... 예상`
                                            : `...${formatDate(calcExpiryDate(endDate))}... 만료`
                                    }
                                    colorType="secondary"
                                    textColor="white"
                                />
                            </InfoContentBox>
                            <InfoContentBox>
                                <div>
                                    <b>최소 참여 인원</b>&nbsp;&nbsp; | &nbsp;&nbsp;
                                    <b>{curCount}명</b> / {minLimit}명
                                </div>
                                {fundingIsActive === "ACTIVE" ? (
                                    <TagButton
                                        width="auto"
                                        text="펀딩 ...진행 중..."
                                        colorType="secondary"
                                        textColor="white"
                                    />
                                ) : (
                                    <TagButton
                                        width="auto"
                                        text={
                                            fundingIsSuccess === "SUCCESS"
                                                ? "펀딩 ...성공..."
                                                : "펀딩 ...실패..."
                                        }
                                        colorType={fundingIsSuccess === "SUCCESS" ? "green" : "red"}
                                        textColor="white"
                                    />
                                )}
                            </InfoContentBox>
                            {maxLimit && (
                                <InfoContentBox>
                                    <div>
                                        <b>최대 참여 인원</b>&nbsp;&nbsp; | &nbsp;&nbsp;
                                        <b>{curCount}명</b> / {maxLimit}명
                                    </div>
                                    <TagButton
                                        width="auto"
                                        text={`...${maxLimit - curCount}명... 남음`}
                                        colorType="secondary"
                                        textColor="white"
                                    />
                                </InfoContentBox>
                            )}
                        </InfoContentContainer>
                        <TextBox text={description} colorType="secondary" />
                        <Line />
                        <PriceContainer>
                            <OriginalPriceWrapper>{formatMoney(price)}</OriginalPriceWrapper>
                            <FundingPriceBox>
                                <TagButton width="auto" text={`...${discountRate}%... 할인`} />
                                <FundingPriceWrapper>
                                    {formatMoney(discountPrice)}
                                </FundingPriceWrapper>
                            </FundingPriceBox>
                        </PriceContainer>
                        <ButtonContainer>
                            {isJoined ? (
                                <TextButton
                                    width="45%"
                                    onClick={openFundingCancelModal}
                                    text="펀딩 참여 취소"
                                    colorType="secondary"
                                />
                            ) : (
                                <TextButton
                                    width="45%"
                                    onClick={applyFunding}
                                    text="펀딩 참여"
                                    colorType="secondary"
                                />
                            )}
                            {isFavorite ? (
                                <TextButton
                                    width="25%"
                                    onClick={handleFavorite}
                                    text={bookmarkCount.toString()}
                                    colorType="secondary"
                                    fill="negative"
                                    icon={<HeartFullIcon />}
                                />
                            ) : (
                                <TextButton
                                    width="25%"
                                    onClick={handleFavorite}
                                    text={bookmarkCount.toString()}
                                    colorType="secondary"
                                    fill="negative"
                                    icon={<HeartBlankIcon />}
                                />
                            )}
                            <TextButton
                                width="25%"
                                onClick={() => setIsShareModalOpen(true)}
                                text="공유"
                                colorType="secondary"
                                fill="negative"
                                icon={<ShareIcon />}
                            />
                        </ButtonContainer>
                    </DetailBox>
                </DetailContainer>
                <TabBar>
                    {fundingTabMenu.map((tab) => (
                        <Tab
                            key={tab.id}
                            width="30%"
                            labelText={tab.labelText}
                            isActive={activeTab === tab.id}
                            onClick={() => handleTabClick(tab.id, tab.redirectUrl)}
                        />
                    ))}
                </TabBar>
                <TabContainer>
                    {activeTab === "store" ? (
                        <FundingStoreTab
                            businessData={businessData}
                            fundingData={businessFundingData}
                        />
                    ) : (
                        <div>리뷰</div>
                    )}
                </TabContainer>
                <ModalContainer>
                    <Modal
                        width="400px"
                        height="auto"
                        isOpen={isCancelModalOpen}
                        setIsOpen={setIsCancelModalOpen}
                        modalTitle="펀딩 참여 취소하기"
                        childComponent={<FundingCancelModal />}
                        buttonType="submit"
                        buttonWidth="40%"
                        onSubmit={cancelFunding}
                        submitButtonText="확인"
                    />
                    <Modal
                        width="400px"
                        height="auto"
                        isOpen={isCancelErrorModalOpen}
                        setIsOpen={setIsCancelErrorModalOpen}
                        modalTitle="펀딩 참여 취소 실패"
                        childComponent={<FundingCancelErrorModal errorCode={errorCode} />}
                        buttonType="confirm"
                        buttonWidth="40%"
                    />
                    <Modal
                        width="500px"
                        height="auto"
                        isOpen={isShareModalOpen}
                        setIsOpen={setIsShareModalOpen}
                        modalTitle="펀딩 공유하기"
                        childComponent={
                            <FundingShareModal
                                fundingId={fundingId}
                                title={title}
                                menu={menu}
                                imageUrl={fundingImageResponseDtos[0].imageUrl}
                            />
                        }
                        buttonType="confirm"
                        buttonWidth="40%"
                    />
                </ModalContainer>
            </FundingContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const FundingTabWithAuth = withAuth({ WrappedComponent: FundingTab });

// ----------------------------------------------------------------------------------------------------

/* Layout */
FundingTabWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingTabWithAuth;
