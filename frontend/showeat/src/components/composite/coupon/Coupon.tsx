/* Import */
import styled from "@emotion/styled";
import Image from "next/image";
import { keyframes } from "@emotion/react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface CouponProps {
    couponData: {
        couponId: number;
        couponStatus: "ACTIVE" | "USED" | "EXPIRED";
        couponType: "SINGLE" | "GIFTCARD";
        couponOriginalPrice: number;
        businessName: string;
        businessImgUrl: string;
        fundingMenu?: string;
        fundingImgUrl: string;
        remainingDays: number;
    };
    onClick: (couponId: number) => void;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const hoverAnimation = keyframes`
from {
  transform: scale(1)
}
to {
  transform: scale(1.01)
}
`;

const clickAnimation = keyframes`
from {
  transform: scale(1.01)
}
to {
  transform: scale(1.02)
}
`;

const CouponContainer = styled("div")<{ couponStatus: string }>`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 200px;
    height: 264px;
    margin: 15px;
    cursor: pointer;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
        animation: ${hoverAnimation} 0.2s linear forwards;
        & .coupon-image {
            filter: ${(props) =>
                props.couponStatus !== "ACTIVE"
                    ? "grayscale(80%)"
                    : "brightness(0.7) saturate(1.5)"};
            box-shadow: 0px 0px 4px 2px ${(props) => props.theme.colors.gray2};
        }
        & .coupon-lower-container {
            box-shadow: 0px 0px 4px 2px ${(props) => props.theme.colors.gray2};
        }
    }

    &:active {
        animation: ${clickAnimation} 0.1s linear forwards;
        & .coupon-image {
            filter: ${(props) =>
                props.couponStatus !== "ACTIVE"
                    ? "grayscale(80%)"
                    : "brightness(0.7) saturate(1.5)"};
            box-shadow: 0px 0px 6px 3px ${(props) => props.theme.colors.gray2};
        }
        & .coupon-lower-container {
            box-shadow: 0px 0px 6px 3px ${(props) => props.theme.colors.gray2};
        }
    }
`;

const CouponUpperContainer = styled("div")`
    width: 100%;
    height: 75%;

    position: relative;

    border: 1px solid ${(props) => props.theme.colors.gray4};
    border-radius: 20px;
`;

const CouponImageWrapper = styled(Image)<{ couponStatus: string }>`
    border: 1px solid ${(props) => props.theme.colors.gray4};
    border-radius: 20px;

    filter: ${(props) => props.couponStatus !== "ACTIVE" && "grayscale(80%)"};
`;

const CouponPeriodWrapper = styled("div")`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 80px;
    height: 30px;

    font-size: 16px;
    font-weight: 700;
    text-shadow: 0px 0px 6px ${(props) => props.theme.colors.gray4};
    color: white;

    background-color: ${(props) => props.theme.colors.primary3};

    border-radius: 0px 10px 10px 0px;

    transform: translateY(80%);
`;

const CouponCheckWrapper = styled("div")<{ couponStatus: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 68px;
    height: 68px;

    border: 2px solid
        ${(props) =>
            props.couponStatus === "USED"
                ? props.theme.colors.normalGreen
                : props.theme.colors.normalRed};
    border-radius: 50%;

    font-size: 20px;
    font-weight: 900;
    color: ${(props) =>
        props.couponStatus === "USED"
            ? props.theme.colors.normalGreen
            : props.theme.colors.normalRed};
`;

const CouponCheckBorderWrapper = styled("div")<{ couponStatus: string }>`
    position: absolute;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 74px;
    height: 74px;

    border: 5px solid
        ${(props) =>
            props.couponStatus === "USED"
                ? props.theme.colors.normalGreen
                : props.theme.colors.normalRed};
    border-radius: 50%;

    background-color: #ffffff;

    transform: translateX(105px) translateY(105px) rotate(-20deg);
`;

const CouponDividerWrapper = styled("div")`
    width: 85%;
    padding-bottom: 2%;
    margin-bottom: 2%;
    border-bottom: 3px dashed ${(props) => props.theme.colors.gray5};
`;

const CouponLowerContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 21%;

    border: 1px solid ${(props) => props.theme.colors.gray4};
    border-radius: 20px;

    background-color: white;
`;

const SellerTextContainer = styled("div")`
    display: flex;
    flex-direction: column;

    max-width: 130px;

    margin-left: 10px;
    padding-bottom: 2px;
`;

const BusinessNameWrapper = styled("div")`
    font-size: 14px;

    color: ${(props) => props.theme.colors.gray4};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MenuNameWrapper = styled("div")`
    font-size: 16px;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const SellerImageWrapper = styled(Image)`
    margin-right: 10px;

    border: 0.5px solid ${(props) => props.theme.colors.gray2};
    border-radius: 50%;
`;

// ----------------------------------------------------------------------------------------------------

/* Function */
function dayCheck(remainingDays: number) {
    if (remainingDays > 0) {
        return `D-${remainingDays}`;
    }
    if (remainingDays === 0) {
        return "오늘 마감";
    }
    return null;
}

/* Coupon Component */
function Coupon({ couponData, onClick }: CouponProps) {
    const days = dayCheck(couponData.remainingDays);

    return (
        <CouponContainer
            onClick={() => onClick(couponData.couponId)}
            couponStatus={couponData.couponStatus}
        >
            <CouponUpperContainer>
                <CouponImageWrapper
                    className="coupon-image"
                    src={couponData.fundingImgUrl}
                    alt="coupon-image"
                    fill
                    couponStatus={couponData.couponStatus}
                />
                {days && <CouponPeriodWrapper>{days}</CouponPeriodWrapper>}
                {couponData.couponStatus !== "ACTIVE" && (
                    <CouponCheckBorderWrapper couponStatus={couponData.couponStatus}>
                        <CouponCheckWrapper couponStatus={couponData.couponStatus}>
                            사용
                            <br />
                            {couponData.couponStatus === "USED" ? "완료" : "불가"}
                        </CouponCheckWrapper>
                    </CouponCheckBorderWrapper>
                )}
            </CouponUpperContainer>
            <CouponDividerWrapper />
            <CouponLowerContainer className="coupon-lower-container">
                <SellerTextContainer>
                    <BusinessNameWrapper>{couponData.businessName}</BusinessNameWrapper>
                    <MenuNameWrapper>
                        {couponData.couponType === "SINGLE"
                            ? couponData.fundingMenu
                            : `${couponData.fundingMenu}`}
                    </MenuNameWrapper>
                </SellerTextContainer>
                <SellerImageWrapper
                    src={couponData.businessImgUrl}
                    alt="seller-image"
                    width={40}
                    height={40}
                />
            </CouponLowerContainer>
        </CouponContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Coupon;
