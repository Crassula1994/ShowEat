/* Import */
import SellerLayout from "@layouts/SellerLayout";
import withAuth from "@libs/withAuth";
import { ReactNode, useEffect, useState } from "react";
import Table from "@/components/common/table";
import styled from "@emotion/styled";
import useUserState from "@hooks/useUserState";
import useSellerState from "@hooks/useSellerState";
import { getTotalStatistic } from "@apis/statistics";
import { TotalStatisticsType } from "@customTypes/apiProps";
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

const BusinessName = styled("div")`
    color: #000;
    font-family: Pretendard;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 100px;
`;

const TableWrapper = styled("div")`
    width: 440px;
    text-align: left;
    padding-bottom: 20px;
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

/* Total Statistics Page */
function TotalStats() {
    const [statistics, setStatistics] = useState<TotalStatisticsType | null>(null);
    const [seller] = useSellerState();
    const [user] = useUserState();
    console.log(user);
    console.log(seller);

    useEffect(() => {
        const fetchStatistics = async () => {
            const { userId } = user;
            const { sellerId } = seller;
            if (userId !== 0 || sellerId !== 0) {
                const result = await getTotalStatistic(sellerId);
                setStatistics(result.data);
                console.log(result.data);
            }
        };

        fetchStatistics();
    }, [user]);

    const headers: string[] = [
        "누적 매출액",
        "누적 성공 펀딩수",
        "누적 성공 펀딩 참여자수",
        "누적 실패 펀딩수",
    ];

    const contents: (string | number)[] = statistics
        ? [
              `${statistics.totalRevenue.toLocaleString()} 원`,
              `${statistics.totalSuccessFundingCnt.toLocaleString()} 회`,
              `${statistics.totalFundingParticipantsCnt.toLocaleString()} 명`,
              `${statistics.totalFailFundingCnt.toLocaleString()} 회`,
          ]
        : [];

    return (
        <TotalContainer>
            <BusinessName>{statistics?.businessName}</BusinessName>
            {statistics?.totalRevenue === 0 ? (
                <BlankList>
                    <Image
                        src="/assets/images/crying-cook-cow.png"
                        width={150}
                        height={150}
                        alt="crying-cook-cow"
                        priority
                    />
                    <TextWrapper>매출 정보가 없소!</TextWrapper>
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
const TotalStatsWithAuth = withAuth({
    WrappedComponent: TotalStats,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
TotalStatsWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TotalStatsWithAuth;
