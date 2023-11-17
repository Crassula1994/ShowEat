/* Import */
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TabProps {
    width: string;
    labelText: string;
    isActive: boolean;
    onClick: () => void;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const TabWrapper = styled("div")<{ width: string }>`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: ${(props) => props.width};
    min-width: 150px;
    box-sizing: border-box;
    padding: 1em 2em;

    // Style Attribute
    border: none;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: white;

    // Interaction Attribute
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    transition: all 0.1s ease;
    &:hover {
        font-weight: 700;
        background-color: ${(props) => props.theme.colors.primary1};
        border-bottom: 3px solid ${(props) => props.theme.colors.primary3};
    }
    &.active {
        font-weight: 700;
        background-color: white;
        background-color: ${(props) => props.theme.colors.primary1};
        border-bottom: 3px solid ${(props) => props.theme.colors.primary3};
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Tab Component */
function Tab(props: TabProps) {
    // States and Variables
    const { width, labelText, isActive, onClick } = props;

    return (
        <TabWrapper width={width} className={isActive ? "active" : ""} onClick={onClick}>
            {labelText}
        </TabWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Tab;
