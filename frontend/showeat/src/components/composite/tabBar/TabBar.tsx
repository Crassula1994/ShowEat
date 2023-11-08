/* Import */
import styled from "@emotion/styled";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TabBarProps {
    children: ReactNode[];
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const TabBarContainer = styled("div")`
    width: 100%;
`;

const TabList = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2em;
`;

// ----------------------------------------------------------------------------------------------------

/* Tab Bar Component */
function TabBar(props: TabBarProps) {
    const { children } = props;

    return (
        <TabBarContainer>
            <TabList>{children}</TabList>
        </TabBarContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default TabBar;
