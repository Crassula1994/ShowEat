/* Import */
import { GetServerSideProps } from "next";
import { ReactNode, useState } from "react";
import SellerLayout from "@layouts/SellerLayout";
import { ProfileSellerInfoTab, ProfileBasicInfoTab } from "@components/custom/tab";
import { sellersProfileTabMenu } from "@configs/tabMenu";
import styled from "@emotion/styled";
import { Tab, TabBar } from "@components/composite/tabBar";
import { useRouter } from "next/router";
import withAuth from "@libs/withAuth";
import Head from "next/head";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface SellerProfileParams {
    tabNames?: string[];
}

interface SellerProfileTabProps {
    tabName: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ProfileContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // Box Model Attribute
    width: 100%;
    min-width: 400px;
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
    const { tabNames } = params as SellerProfileParams;
    const allowedTabNames = sellersProfileTabMenu.map((tab) => tab.id);

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

/* Seller Profile Tab Page */
function SellerProfileTab(props: SellerProfileTabProps) {
    // States and Variables
    const { tabName } = props;
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<string>(tabName || "seller-info");

    // Function for Handling Tab Click
    const handleTabClick = (id: string, redirectUrl: string) => {
        setActiveTab(id);
        router.push(redirectUrl, undefined, { shallow: true });
    };

    return (
        <>
            <Head>
                <title>셀러 정보</title>
                <meta name="description" content="셀러님의 정보 페이지입니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ProfileContainer>
                <TitleWrapper>셀러 정보</TitleWrapper>
                <TabBar>
                    {sellersProfileTabMenu.map((tab) => (
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
                    {activeTab === "seller-info" ? (
                        <ProfileSellerInfoTab />
                    ) : (
                        <ProfileBasicInfoTab />
                    )}
                </TabContainer>
            </ProfileContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const SellerProfileTabWithAuth = withAuth({
    WrappedComponent: SellerProfileTab,
    guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
SellerProfileTabWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SellerLayout>{page}</SellerLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SellerProfileTabWithAuth;
