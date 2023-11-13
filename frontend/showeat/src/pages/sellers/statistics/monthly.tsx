import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode, useEffect, useState } from "react";
import Table from "@/components/common/table";
import styled from "@emotion/styled";
import useUserState from "@hooks/useUserState";
import useSellerState from "@hooks/useSellerState";
import { getMonthlyStatistic } from "@apis/statistics";
import { MonthlyStatisticsType } from "@customTypes/apiProps";
import Image from "next/image";
// ----------------------------------------------------------------------------------------------------
const TotalContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
    padding-top: 100px;
`;

const TableWrapper = styled("div")`
    width: 440px;
    text-align: left;
    padding-bottom: 20px;
`;

const DateContainer = styled("div")`
    display: flex;
    align-items: center;
    color: #000;
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    gap: 10px;
    padding-bottom: 100px;
`;

const DateButton = styled("button")`
    font-size: 40px;
    cursor: pointer;
    color: #000;
    background: none;
    border: none;
    outline: none;
`;

const DateLabel = styled("div")`
    font-size: 30px;
    margin: 0 10px;
`;

const BlankList = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
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

/* Monthly Statistics Page */
function MonthlyStats() {
    const [statistics, setStatistics] = useState<MonthlyStatisticsType[]>([]);
    const [seller] = useSellerState();
    const [user] = useUserState();
    console.log(user);
    console.log(seller);

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // 현재 월을 기준
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        const fetchStatistics = async () => {
            const { userId } = user;
            const { sellerId } = seller;
            if (userId !== 0 || sellerId !== 0) {
                const result = await getMonthlyStatistic(sellerId);
                setStatistics(result.data);
                console.log("정보", result.data);
            }
        };

        fetchStatistics();
    }, [user]);

    const headers: string[] = ["매출액", "성공 펀딩수", "성공 펀딩 참여자수", "실패 펀딩수"];

    const filteredStatistics = statistics?.filter((item) => {
        return item.year === currentYear && item.month === currentMonth;
    });

    const contents: (string | number)[] =
        filteredStatistics && filteredStatistics.length > 0
            ? [
                  `${filteredStatistics[0].revenue.toLocaleString()} 원`,
                  `${filteredStatistics[0].successFundingCnt.toLocaleString()} 회`,
                  `${filteredStatistics[0].fundingParticipantsCnt.toLocaleString()} 명`,
                  `${filteredStatistics[0].failFundingCnt.toLocaleString()} 회`,
              ]
            : [];
    const decreaseMonth = () => {
        setCurrentMonth((prevMonth) => {
            if (prevMonth === 1) {
                setCurrentYear((prevYear) => prevYear - 1);
                return 12;
            }
            return prevMonth - 1;
        });
    };

    const increaseMonth = () => {
        setCurrentMonth((prevMonth) => {
            if (prevMonth === 12) {
                setCurrentYear((prevYear) => prevYear + 1);
                return 1;
            }
            return prevMonth + 1;
        });
    };
    return (
        <TotalContainer>
            <DateContainer>
                <DateButton onClick={decreaseMonth}>{"<"}</DateButton>
                <DateLabel>
                    {currentYear}년 {currentMonth}월
                </DateLabel>
                <DateButton onClick={increaseMonth}>{">"}</DateButton>
            </DateContainer>
            {filteredStatistics.length === 0 ? (
                <BlankList>
                    <Image
                        src="/assets/images/crying-cook-cow.png"
                        width={150}
                        height={150}
                        alt="crying-cook-cow"
                        priority
                    />
                    <TextWrapper>{currentMonth}월 매출 정보가 없소!</TextWrapper>
                </BlankList>
            ) : (
                <TableWrapper>
                    <Table headerWidth="50%" gap="1.5em" headers={headers} contents={contents} />
                </TableWrapper>
            )}
        </TotalContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const MonthlyStatsWithAuth = withAuth({
    WrappedComponent: MonthlyStats,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
MonthlyStatsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default MonthlyStatsWithAuth;
