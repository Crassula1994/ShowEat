/* Import */
import styled from "@emotion/styled";
import Table from "@components/common/table";
import Image from "next/image";

interface CouponDetailsProps {
    couponDetailsData: {
        couponId: number;
        couponStatus: "ACTIVE" | "USED" | "EXPIRED";
        couponType: "SINGLE" | "GIFTCARD";
        couponPrice: number;
        expirationDate: string;
        businessName: string;
        fundingTitle: string;
        fundingMenu: string;
        fundingDiscountPrice: number;
        fundingPrice: number;
        couponQrCodeImgUrl: string;
    };
}

const CouponContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0;
    gap: 10px;
`;

const CouponWrapper = styled("div")`
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
`;
const BusinessName = styled("div")`
    color: rgba(0, 0, 0, 0.5);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    width: 550px;
    height: 25px;
    flex-direction: column;
    justify-content: center;
`;

const CouponName = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    width: 550px;
    height: 25px;
    flex-direction: column;
    justify-content: center;
`;

const CouponDetails = styled("div")`
    width: 550px;
    height: 150px;
    display: flex;
`;
const TableWrapper = styled("div")`
    width: 440px;
`;

function CouponModal(props: CouponDetailsProps) {
    const {
        couponDetailsData: {
            expirationDate,
            businessName,
            fundingTitle,
            fundingMenu,
            fundingDiscountPrice,
            fundingPrice,
            couponQrCodeImgUrl,
        },
    } = props;

    const headers = ["펀딩명", "유효기간", "금액권 가격", "구입 가격"];
    // const headers = ["펀딩명", "유효기간", "메뉴 가격", "구입 가격"];
    const contents = [fundingTitle, expirationDate, fundingPrice, fundingDiscountPrice];

    return (
        <CouponContainer>
            <CouponWrapper>쿠폰 사용 정보</CouponWrapper>
            <BusinessName>상호: {businessName}</BusinessName>
            <CouponName> {fundingMenu}</CouponName>
            <CouponDetails>
                <TableWrapper>
                    <Table headerWidth="50%" headers={headers} contents={contents} />
                </TableWrapper>
                <Image alt="qrcode" src={couponQrCodeImgUrl} height={150} width={150} />
            </CouponDetails>
        </CouponContainer>
    );
}

export default CouponModal;
