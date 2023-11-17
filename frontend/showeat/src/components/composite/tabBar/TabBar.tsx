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
    // Box Model Attribute
    width: 100%;

    // Style Attribute
    border-bottom: 1px solid ${(props) => props.theme.colors.gray2};
`;

const TabList = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5em;
`;

// ----------------------------------------------------------------------------------------------------

/* Tab Bar Component */
function TabBar(props: TabBarProps) {
    // States and Variables
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
