/* Import */
import withAuth from "@libs/withAuth";
import { ReactNode, useEffect, useState } from "react";
import BuyerLayout from "@/layouts/BuyerLayout";
import styled from "@emotion/styled";
import Coupon from "@components/coupon/Coupon";
import getCouponList from "@apis/coupons";
import TextButton from "@components/common/button/TextButton";
import useUserState from "@hooks/useUserState";

const CouponContainer = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
`;

const CouponWrapper = styled("div")`
    display: grid;
    font-weight: 700;
    font-size: 40px;
`;

const CouponList = styled("div")`
    display: flex;
    flex-wrap: wrap;
    width: 700px;
    align-items: center;
    margin-top: 20px;
`;

function Coupons() {
    const [couponData, setCouponData] = useState([]);
    const [status, setStatus] = useState<string>("");
    const [user] = useUserState();

    // 쿠폰 상태 클릭
    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
    };

    const fetchCouponData = () => {
        const { userId } = user;
        getCouponList(userId, status)
            .then((result) => {
                const { data } = result;
                setCouponData(data);
            })
            .catch((error) => {
                console.error("쿠폰 데이터를 가져오는 중 오류 발생:", error);
            });
    };

    useEffect(() => {
        if (status) {
            fetchCouponData();
        }
    }, [status]);

    return (
        <CouponContainer>
            <CouponWrapper>보유 쿠폰</CouponWrapper>
            <TextButton
                width="150px"
                onClick={() => handleStatusChange("ACTIVE")}
                text="사용 가능"
                curve="round"
            />
            <TextButton
                width="150px"
                onClick={() => handleStatusChange("USED")}
                text="사용 완료"
                curve="round"
            />
            <TextButton
                width="150px"
                onClick={() => handleStatusChange("EXPIRED")}
                text="사용 불가"
                curve="round"
            />
            {couponData.length === 0 ? (
                <div>쿠폰이 없습니다.</div>
            ) : (
                <CouponList>
                    {couponData.map((coupon) => (
                        <Coupon key={coupon.couponId} couponData={coupon} onClick={() => {}} />
                    ))}
                </CouponList>
            )}
        </CouponContainer>
    );
}

/* Middleware */
const CouponWithAuth = withAuth({ WrappedComponent: Coupons, guardType: "PUBLIC" });

/* Layout */
CouponWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <BuyerLayout>{page}</BuyerLayout>;
};

export default CouponWithAuth;
