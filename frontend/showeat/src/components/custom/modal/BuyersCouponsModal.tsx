/* Import */
import { formatMoney } from "@utils/format";
import styled from "@emotion/styled";
import Table from "@components/common/table";
import Image from "next/image";
import { CouponType } from "@customTypes/apiProps";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface BuyersCouponsModalProps {
    coupon: CouponType;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const CouponContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
`;

const CouponWrapper = styled("div")`
    text-align: center;
    font-size: 30px;
    font-weight: 900;
`;

const BusinessName = styled("div")`
    color: ${(props) => props.theme.colors.gray4};
    font-size: 16px;
    display: flex;
    height: 25px;
    flex-direction: column;
    align-self: flex-start;

    padding-left: 1em;
`;

const CouponName = styled("div")`
    font-size: 20px;
    font-weight: 700;
`;

const CouponDetails = styled("div")`
    display: flex;
`;
const TableWrapper = styled("div")`
    width: 340px;
`;

const LinkIconWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: flex-start;

    width: 30px;
`;

function BuyersCouponsModal(props: BuyersCouponsModalProps) {
    const router = useRouter();
    const { coupon } = props;
    const {
        businessName,
        couponQrCodeImgUrl,
        couponType,
        expirationDate,
        fundingPrice,
        fundingDiscountPrice,
        fundingMenu,
        fundingTitle,
        fundingId,
    } = coupon;

    let headers;
    if (couponType === "GIFTCARD") {
        headers = ["펀딩명", "유효기간", "금액권 가격", "구입 가격"];
    } else {
        headers = ["펀딩명", "유효기간", "메뉴 가격", "구입 가격"];
    }

    const contents = [
        fundingTitle,
        expirationDate,
        formatMoney(fundingPrice),
        formatMoney(fundingDiscountPrice),
    ];

    return (
        <CouponContainer>
            <CouponWrapper>쿠폰 사용 정보</CouponWrapper>
            <BusinessName>{businessName}</BusinessName>
            <CouponName> {fundingMenu}</CouponName>
            <CouponDetails>
                <TableWrapper>
                    <Table headerWidth="50%" headers={headers} contents={contents} />
                </TableWrapper>
                <LinkIconWrapper>
                    <Image
                        src="/assets/icons/link-icon.svg"
                        alt="coupon-link"
                        width={24}
                        height={24}
                        onClick={() => router.push(`/fundings/${fundingId}/store`)}
                        style={{ cursor: "pointer" }}
                    />
                </LinkIconWrapper>
                <Image alt="qr-code" src={couponQrCodeImgUrl} height={150} width={150} />
            </CouponDetails>
        </CouponContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default BuyersCouponsModal;
