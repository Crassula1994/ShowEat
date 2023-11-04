/* Import */
import styled from "@emotion/styled";
import Image from "next/image";
import { calcRemainTime, changeFontWeight } from "@/utils/format";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface CardProps {
    fundingData: {
        fundingId: number;
        title: string;
        businessName: string;
        category: string;
        maxLimit: number;
        minLimit: number;
        curCount: number;
        menu: string;
        price: number;
        discountPrice: number;
        discountRate: number;
        startDate: string;
        endDate: string;
        fundingIsActive: string;
        fundingIsSuccess: string;
        fundingImageResponseDtos: {
            imageId: number;
            imageUrl: string;
        }[];
        fundingIsBookmark: boolean;
    };
    onFundingClick: (fundingId: number) => void;
    onBookmarkAdd: (fundingId: number) => void;
    onBookmarkCancle: (fundingId: number) => void;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const CardContainer = styled("div")`
    width: 250px;
    height: 345px;

    border-radius: 20px;
    box-shadow: 0px 0px 2px 1px ${(props) => props.theme.colors.gray2};

    cursor: pointer;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
        box-shadow: 0px 0px 4px 2px ${(props) => props.theme.colors.gray2};
    }

    &:active {
        box-shadow: 0px 0px 6px 3px ${(props) => props.theme.colors.gray2};
    }
`;

const CardUpperContainer = styled("div")`
    position: relative;

    width: 100%;
    height: 60%;

    border-radius: 20px 20px 0px 0px;
`;

const CardImageWrapper = styled(Image)`
    border-radius: 20px 20px 0px 0px;

    z-index: -1;
`;

const CardUpperContentContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: start;
`;

const HeartContainer = styled("div")`
    margin-top: 5px;
    margin-left: 10px;

    cursor: pointer;

    z-index: 100;
`;

const FullHeartWrapper = styled(Image)`
    &:hover {
        filter: brightness(0.8) saturate(1.2);
    }

    &:active {
        filter: brightness(0.6) saturate(1.5);
    }
`;

const BlankHeartWrapper = styled(Image)`
    &:hover {
        filter: brightness(0.8) saturate(1.2);
    }

    &:active {
        filter: brightness(0.6) saturate(1.5);
    }
`;

const DiscountContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 60px;
    height: 50px;

    border-radius: 0% 0% 15% 15% / 0% 0% 10% 10%;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 50% 85%, 0% 100%);

    padding-bottom: 5px;
    margin-right: 20px;
    margin-top: 0px;

    background-color: ${(props) => props.theme.colors.normalRed};
`;

const DiscountPercentageWrapper = styled("span")`
    font-size: 16px;
    font-weight: 700;
    color: white;
    text-shadow: 0px 0px 2px ${(props) => props.theme.colors.gray2};
`;

const DiscountOffWrapper = styled("span")`
    font-size: 12px;
    font-weight: 500;
    color: white;
    text-shadow: 0px 0px 4px ${(props) => props.theme.colors.gray2};
`;

const CardUpperPercentageContainer = styled("div")`
    position: absolute;

    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    width: 100%;
    height: 10%;

    bottom: 0;

    background-color: white;
`;

const CardMaxPeopleText = styled("span")`
    font-size: 12px;

    margin-left: 10px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
        font-size: 12px;
    }
`;

const CardProgressPercentageText = styled("span")`
    font-size: 14px;
    font-weight: 700;

    margin-right: 10px;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const CardCenterContainer = styled("div")`
    width: 100%;
    height: 3%;

    background-color: ${(props) => props.theme.colors.secondary1};
`;

const CardProgressBarWrapper = styled("div")<{ progress: number }>`
    width: ${(props) => (props.progress > 100 ? "100%" : `${props.progress}%`)};
    height: 100%;

    background-color: ${(props) => props.theme.colors.secondary3};
`;

const CardLowerContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 100%;
    height: 37%;
`;

const BuisnessTitleContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;

    width: 100%;
    height: 35%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const BuisnessNameWrapper = styled("span")`
    font-size: 12px;
    color: ${(props) => props.theme.colors.gray4};

    width: 90%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const FundingNameWrapper = styled("span")`
    font-size: 18px;
    font-weight: 700;

    width: 90%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MenuContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 90%;
    height: 45%;
`;

const MenuNameWrapper = styled("span")`
    font-size: 14px;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MenuPriceContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: end;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const OriginPriceWrapper = styled("span")`
    font-size: 12px;
    font-weight: 300;
    text-decoration: line-through;
    color: ${(props) => props.theme.colors.gray4};
`;

const SalePriceWrapper = styled("span")`
    font-size: 18px;
    font-weight: 900;
`;

const RemainingTimeWrapper = styled("span")`
    font-size: 14px;
    font-weight: 700;

    width: 90%;
    height: 20%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

// ----------------------------------------------------------------------------------------------------

/* Card Component */
function Card({ fundingData, onFundingClick, onBookmarkAdd, onBookmarkCancle }: CardProps) {
    const maxPeopleText = changeFontWeight(
        `최대 참여 인원까지 ...${fundingData.maxLimit - fundingData.curCount}명... 남았습니다!`,
    );

    function numberWithCommas(x: number) {
        if (x !== undefined && x !== null) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return "";
    }

    const progressPercent = parseFloat(
        ((fundingData.curCount / fundingData.minLimit) * 100).toFixed(0),
    );

    const formattedOriginPrice = numberWithCommas(fundingData.price);
    const formattedSalePrice = numberWithCommas(fundingData.discountPrice);

    const remainTime = calcRemainTime(fundingData.endDate);

    return (
        <CardContainer onClick={() => onFundingClick(fundingData.fundingId)}>
            <CardUpperContainer>
                <CardImageWrapper
                    className="card-image"
                    src={
                        fundingData.fundingImageResponseDtos[0].imageUrl ||
                        "/assets/images/service-logo.png"
                    }
                    alt="card-img"
                    fill
                />
                <CardUpperContentContainer>
                    <HeartContainer>
                        {fundingData.fundingIsBookmark ? (
                            <FullHeartWrapper
                                src="/assets/icons/heart-full-icon.svg"
                                alt="heart-full-icon"
                                width={30}
                                height={30}
                                onClick={() => onBookmarkCancle(fundingData.fundingId)}
                            />
                        ) : (
                            <BlankHeartWrapper
                                src="/assets/icons/heart-blank-icon.svg"
                                alt="heart-blank-icon"
                                width={30}
                                height={30}
                                onClick={() => onBookmarkAdd(fundingData.fundingId)}
                            />
                        )}
                    </HeartContainer>
                    <DiscountContainer>
                        <DiscountPercentageWrapper>{`${fundingData.discountRate}%`}</DiscountPercentageWrapper>
                        <DiscountOffWrapper>OFF</DiscountOffWrapper>
                    </DiscountContainer>
                </CardUpperContentContainer>
                <CardUpperPercentageContainer>
                    <CardMaxPeopleText dangerouslySetInnerHTML={{ __html: maxPeopleText }} />
                    <CardProgressPercentageText>{`${progressPercent}%`}</CardProgressPercentageText>
                </CardUpperPercentageContainer>
            </CardUpperContainer>
            <CardCenterContainer>
                <CardProgressBarWrapper progress={progressPercent} />
            </CardCenterContainer>
            <CardLowerContainer>
                <BuisnessTitleContainer>
                    <BuisnessNameWrapper>{fundingData.businessName}</BuisnessNameWrapper>
                    <FundingNameWrapper>{fundingData.title}</FundingNameWrapper>
                </BuisnessTitleContainer>
                <MenuContainer>
                    <MenuNameWrapper>{fundingData.menu}</MenuNameWrapper>
                    <MenuPriceContainer>
                        <OriginPriceWrapper>{`￦ ${formattedOriginPrice}`}</OriginPriceWrapper>
                        <SalePriceWrapper>{`￦ ${formattedSalePrice}`}</SalePriceWrapper>
                    </MenuPriceContainer>
                </MenuContainer>
                <RemainingTimeWrapper>
                    {remainTime === "이미 마감되었습니다" || remainTime === "오늘이 마감!"
                        ? remainTime
                        : `마감까지 ${remainTime}`}
                </RemainingTimeWrapper>
            </CardLowerContainer>
        </CardContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Card;
