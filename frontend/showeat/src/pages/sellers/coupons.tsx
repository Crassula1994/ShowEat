/* Import */
import withAuth from "@libs/withAuth";
import { ReactNode, useEffect, useState } from "react";
import BuyerLayout from "@/layouts/BuyerLayout";
import styled from "@emotion/styled";
import Coupon from "@/components/composite/coupon/Coupon";
import getCouponList from "@apis/coupons";
import TextButton from "@components/common/button/TextButton";
import useUserState from "@hooks/useUserState";
import Modal from "@/components/composite/modal";

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

const NoCouponWrapper = styled("div")`
    font-size: 25px;
`;

const CouponList = styled("div")`
    display: flex;
    flex-wrap: wrap;
    width: 700px;
    align-items: center;
    margin-top: 20px;
`;

const MoreButton = styled("div")`
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin: 0 auto;
    width: 100%;
`;

function Coupons() {
    const [couponData, setCouponData] = useState([]);
    const [status, setStatus] = useState<string>("");
    const [page, setPage] = useState(0);
    const [user] = useUserState();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        setPage(0);
    };

    const handleLoadMore = () => {
        setPage(page + 1); // 더보기 : 페이지 + 1
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const fetchCouponData = () => {
        const { userId } = user;
        getCouponList(userId, status, page)
            .then((data) => {
                if (page === 0) {
                    setCouponData(data);
                } else {
                    setCouponData([...couponData, ...data]);
                }
            })
            .catch((error) => {
                console.error("쿠폰 데이터를 가져오는 중 오류 발생:", error);
            });
    };

    useEffect(() => {
        if (status) {
            fetchCouponData();
        }
    }, [status, page]);

    return (
        <CouponContainer>
            <NoCouponWrapper>보유 쿠폰</NoCouponWrapper>
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
                <MoreButton>
                    <CouponWrapper>쿠폰이 없습니다.</CouponWrapper>
                </MoreButton>
            ) : (
                <CouponList>
                    {couponData.map((coupon) => (
                        <Coupon
                            key={coupon.couponId}
                            couponData={coupon}
                            onClick={() => openModal(coupon)}
                        />
                    ))}
                    <MoreButton>
                        <TextButton
                            width="150px"
                            onClick={() => handleLoadMore()}
                            text="더보기"
                            curve="round"
                        />
                    </MoreButton>
                </CouponList>
            )}
            <Modal
                width="400px"
                height="300px"
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                childComponent="모달 넣을곳"
                buttonType="close"
                buttonWidth="150px"
            />
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
