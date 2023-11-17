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

const HeaderWrapper = styled("div")<{ width: string; gap: string }>`
    // Layout Attribute
    display: table-cell;

    // Box Model Attribute
    width: ${(props) => props.width};
    padding: ${(props) => props.gap} 1em;

    // Text Attribute
    font-weight: 700;
`;

const CellWrapper = styled("div")<Partial<TableProps>>`
    // Layout Attribute
    display: table-cell;

    // Box Model Attribute
    padding: ${(props) => props.gap} 1em;

    // Text Attribute
    text-align: ${(props) => props.contentAlign};
`;

// ----------------------------------------------------------------------------------------------------

/* Table Component */
function Table(props: TableProps) {
    const { headerWidth = "20%", headers, contents, contentAlign = "left", gap = "0.5em" } = props;

    return (
        <TableContainer>
            {headers.map((header, index) => (
                <RowContainer key={index}>
                    <HeaderWrapper width={headerWidth} gap={gap}>
                        {header}
                    </HeaderWrapper>
                    <CellWrapper contentAlign={contentAlign} gap={gap}>
                        {contents[index]}
                    </CellWrapper>
                </RowContainer>
            ))}
        </TableContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Table;
