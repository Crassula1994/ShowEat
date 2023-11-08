/* Import */
import FundingLayout from "@layouts/FundingLayout";
import { ReactNode, useEffect, useState } from "react";
import { Tab, TabBar } from "@/components/composite/tabBar";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------------------------------------

/* Funding Page */
function FundingTab() {
    const router = useRouter();
    const { fundingId, tab: currentTab } = router.query;
    const defaultTab = "review";
    const fundingTabs = [
        { labelText: "review", href: `/fundings/${fundingId}/review` },
        { labelText: "store", href: `/fundings/${fundingId}/store` },
    ];
    const [activeTab, setActiveTab] = useState<string>((currentTab as string) || defaultTab);
    const [number, setNumber] = useState<number>(0);
    const handleTabClick = (labelText: string, href: string) => {
        setActiveTab(labelText);
        router.push(href, undefined, { shallow: true });
    };

    return (
        <div>
            펀딩 메인 페이지입니다.
            {number}
            <button type="button" onClick={() => setNumber(number + 1)}>
                더하기
            </button>
            <TabBar>
                {fundingTabs.map((tab) => (
                    <Tab
                        key={tab.labelText}
                        labelText={tab.labelText}
                        isActive={activeTab === tab.labelText}
                        onClick={() => handleTabClick(tab.labelText, tab.href)}
                    />
                ))}
            </TabBar>
            <div>{activeTab === "review" ? <div>리뷰</div> : <div>상점</div>}</div>
        </div>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Layout */
FundingTab.getLayout = function getLayout(page: ReactNode) {
    return <FundingLayout>{page}</FundingLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingTab;
