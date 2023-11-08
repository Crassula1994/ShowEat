/* Import */
import withAuth from "@libs/withAuth";
import { ReactNode, useEffect, useState } from "react";
import BuyerLayout from "@/layouts/BuyerLayout";
import styled from "@emotion/styled";
import { getCouponList, getCouponDetails } from "@apis/coupons";
import TextButton from "@components/common/button/TextButton";
import useUserState from "@hooks/useUserState";
import CouponModal from "@components/custom/modal/BuyersCouponModal";
import Modal from "@components/composite/modal";
import Coupon from "@components/composite/coupon/Coupon";

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
    width: 950px;
    align-items: center;
    margin: 30px 0 30px 20px;
    justify-content: flex-start;
`;

const MoreButton = styled("div")`
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin: 0 auto;
    width: 100%;
    padding-top: 30px;
`;

function Coupons() {
    const [couponData, setCouponData] = useState([]);
    const [status, setStatus] = useState<string>("");
    const [page, setPage] = useState(0);
    const [user] = useUserState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [last, setLast] = useState(false);

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        setPage(0);
    };

    const handleLoadMore = () => {
        setPage(page + 1); // 더보기 : 페이지 + 1
    };

    const openModal = (coupon) => {
        setSelectedCoupon(coupon);
        getCouponDetails(coupon.couponId)
            .then((couponDetailsData) => {
                setSelectedCoupon(couponDetailsData.data);
                setIsModalOpen(true);
            })
            .catch((error) => {
                console.error("쿠폰 세부 정보를 불러오지 못했습니다:", error);
            });
    };

    const fetchCouponData = () => {
        const { userId } = user;
        getCouponList(userId, status, page)
            .then((data) => {
                if (page === 0) {
                    setCouponData(data.couponListResponseDtos);
                    setLast(data.last);
                } else {
                    setCouponData([...couponData, ...data.couponListResponseDtos]);
                    setLast(data.last);
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
                    {!last ? (
                        <MoreButton>
                            <TextButton
                                width="150px"
                                onClick={() => handleLoadMore()}
                                text="더보기"
                                curve="round"
                            />
                        </MoreButton>
                    ) : null}
                </CouponList>
            )}
            <Modal
                width="auto"
                height="auto"
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                childComponent={<CouponModal couponDetailsData={selectedCoupon} />}
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
