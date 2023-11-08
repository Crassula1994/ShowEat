/* Import */
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TabProps {
    labelText: string;
    isActive: boolean;
    onClick: () => void;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const TabWrapper = styled("div")`
    padding: 1em 2em;
    box-sizing: border-box;
    cursor: pointer;
    border: 1px solid #ccc;
    background-color: #f0f0f0;
    margin-right: 4px;

    &:hover {
        background-color: #e0e0e0;
    }

    &.active {
        background-color: white;
        border-bottom: none;
        position: relative;
        top: 1px;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Tab Component */
function Tab(props: TabProps) {
    const { labelText, isActive, onClick } = props;
    return (
        <TabWrapper className={isActive ? "active" : ""} onClick={onClick}>
            {labelText}
        </TabWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Tab;
