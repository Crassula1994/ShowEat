/* Import */
import styled from "@emotion/styled";
import { TableProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Style */
const TableContainer = styled("div")`
    // Layout Attribute
    display: table;

    // Box Model Attribute
    width: 100%;

    // Style Attribute
    border-collapse: collapse;
`;

const RowContainer = styled("div")`
    // Layout Attribute
    display: table-row;
`;

const HeaderWrapper = styled("div")<{ width: string }>`
    // Layout Attribute
    display: table-cell;

    // Box Model Attribute
    width: ${(props) => props.width};
    padding: 0.5em 1em;

    // Text Attribute
    font-weight: 700;
`;

const CellWrapper = styled("div")`
    // Layout Attribute
    display: table-cell;

    // Box Model Attribute
    padding: 0.5em 1em;
`;

// ----------------------------------------------------------------------------------------------------

/* Table Component */
function Table(props: TableProps) {
    const { headerWidth = "20%", headers, contents } = props;

    return (
        <TableContainer>
            {headers.map((header, index) => (
                <RowContainer key={index}>
                    <HeaderWrapper width={headerWidth}>{header}</HeaderWrapper>
                    <CellWrapper>{contents[index]}</CellWrapper>
                </RowContainer>
            ))}
        </TableContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Table;
