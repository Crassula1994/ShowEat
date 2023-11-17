/* Import */
import { GetServerSideProps } from "next";
import { ReactNode, useState } from "react";
import SellerLayout from "@layouts/SellerLayout";
import { StatisticsMonthlyTab, StatisticsTotalTab } from "@components/custom/tab";
import { statisticsTabMenu } from "@configs/tabMenu";
import styled from "@emotion/styled";
import { Tab, TabBar } from "@components/composite/tabBar";
import { useRouter } from "next/router";
import withAuth from "@libs/withAuth";
import Head from "next/head";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface StatisticsParams {
    tabNames?: string[];
}

interface StatisticsTabProps {
    tabName: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const StatisticsContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // Box Model Attribute
    width: 100%;
    box-sizing: border-box;
    padding: 5% 15%;
`;

const TitleWrapper = styled("div")`
    // Text Attribute
    font-size: 30px;
    font-weight: 900;

    // Box Model Attribute
    width: 100%;
    margin-bottom: 2em;
`;

const TabContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;

    // Box Model Attribute
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Server Side Rendering */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // States and Variables
    const { tabNames } = params as StatisticsParams;
    const allowedTabNames = statisticsTabMenu.map((tab) => tab.id);

    if (!tabNames || !allowedTabNames.includes(tabNames[0])) {
        return {
            redirect: {
                destination: "/error/not-found",
                permanent: false,
            },
        };
    }

    return {
        props: {
            tabName: tabNames?.[0],
        },
    };
};

// ----------------------------------------------------------------------------------------------------

/* Statistics Tab Page */
function StatisticsTab(props: StatisticsTabProps) {
    // States and Variables
    const { tabName } = props;
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>(tabName || "monthly");

    // Function for Handling Tab Click
    const handleTabClick = (id: string, redirectUrl: string) => {
        setActiveTab(id);
        router.push(redirectUrl, undefined, { shallow: true });
    };

    return (
        <>
            <Head>
                <title>셀러 매출 통계</title>
                <meta name="description" content="셀러님의 매출 통계 페이지입니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <StatisticsContainer>
                <TitleWrapper>매출 통계</TitleWrapper>
                <TabBar>
                    {statisticsTabMenu.map((tab) => (
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
                    {activeTab === "monthly" ? <StatisticsMonthlyTab /> : <StatisticsTotalTab />}
                </TabContainer>
            </StatisticsContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const StatisticsTabWithAuth = withAuth({ WrappedComponent: StatisticsTab, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
StatisticsTabWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default StatisticsTabWithAuth;
