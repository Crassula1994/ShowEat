/* Import */
import { fundingTabMenuConfig } from "@configs/tabMenuConfig";
import { GetServerSideProps } from "next";
import { ReactNode, useState } from "react";
import MainLayout from "@layouts/MainLayout";
import styled from "@emotion/styled";
import { Tab, TabBar } from "@components/composite/tabBar";
import { useRouter } from "next/router";
import withAuth from "@libs/withAuth";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface FundingParams {
    fundingId?: string;
    tabNames?: string[];
}

interface FundingTabProps {
    fundingId: string;
    tabName: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const FundingContainer = styled("div")`
    width: 100vw;
`;

// ----------------------------------------------------------------------------------------------------

/* Server Side Rendering */
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // States and Variables
    const { fundingId, tabNames } = params as FundingParams;
    const allowedTabNames = fundingTabMenuConfig.map((tab) => tab.id);

    if (!fundingId || !tabNames || !allowedTabNames.includes(tabNames[0])) {
        return {
            redirect: {
                destination: "/error/not-found",
                permanent: false,
            },
        };
    }

    return {
        props: {
            fundingId,
            tabName: tabNames?.[0],
        },
    };
};

// ----------------------------------------------------------------------------------------------------

/* Funding Tab Page */
function FundingTab(props: FundingTabProps) {
    // States and Variables
    const router = useRouter();
    const { fundingId, tabName } = props;
    const [activeTab, setActiveTab] = useState<string>(tabName || "store");

    // Function for Handling Tab Click
    const handleTabClick = (id: string, redirectUrl: string) => {
        const newRedirectUrl = redirectUrl.replace("[fundingId]", `${fundingId}`);
        setActiveTab(id);
        router.push(newRedirectUrl, undefined, { shallow: true });
    };

    return (
        <FundingContainer>
            펀딩 메인 페이지입니다.
            <TabBar>
                {fundingTabMenuConfig.map((tab) => (
                    <Tab
                        key={tab.id}
                        width="30%"
                        labelText={tab.labelText}
                        isActive={activeTab === tab.id}
                        onClick={() => handleTabClick(tab.id, tab.redirectUrl)}
                    />
                ))}
            </TabBar>
            <div>{activeTab === "store" ? <div>상점</div> : <div>리뷰</div>}</div>
        </FundingContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const FundingTabWithAuth = withAuth({ WrappedComponent: FundingTab });

// ----------------------------------------------------------------------------------------------------

/* Layout */
FundingTabWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingTabWithAuth;
