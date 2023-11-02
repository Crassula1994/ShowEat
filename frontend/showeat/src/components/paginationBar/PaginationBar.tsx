/* Import */
import styled from "@emotion/styled";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import { useState, useEffect } from "react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface PaginationBarProps {
    pageCount: number;
    colorType: "primary" | "secondary" | "gray";
    isSelected: number;
    setIsSelected: React.Dispatch<React.SetStateAction<number>>;
    onClick: (num: number) => void;
    width?: number;
    height?: number;
    fontSize?: number;
}

interface PageNumberWrapperTypes {
    colorType: "primary" | "secondary" | "gray";
    selectedNum: boolean;
    isDot: boolean;
    width: number;
    height: number;
    fontSize: number;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const hoverAnimation = keyframes`
from {
  transform: scale(1)
}
to {
  transform: scale(1.08)
}
`;

const clickAnimation = keyframes`
from {
  transform: scale(1)
}
to {
  transform: scale(1.16)
}
`;

const PaginationBarContainer = styled("div")`
    display: inline-flex;
    justify-content: space-evenly;
    align-items: center;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const PageNumberWrapper = styled("div")<PageNumberWrapperTypes>`
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;

    font-size: ${(props) => `${props.fontSize}px`};
    font-weight: ${(props) => (props.selectedNum ? "700" : "500")};

    margin: 0px 0.1em;

    border-radius: 10px;

    color: ${(props) => (props.selectedNum ? "white" : "black")};
    background-color: ${(props) =>
        props.selectedNum ? props.theme.colors[`${props.colorType}3`] : "white"};

    cursor: pointer;

    pointer-events: ${(props) => (props.selectedNum || props.isDot ? "none" : "auto")};

    &:hover {
        color: black;
        font-weight: 700;

        background-color: ${(props) => props.theme.colors[`${props.colorType}1`]};
        animation: ${hoverAnimation} 0.2s linear forwards;
    }

    &:active {
        animation: ${clickAnimation} 0.1s linear forwards;
    }
`;

const PageArrowWrapper = styled(Image)`
    background-color: white;

    margin: 0px 0.1em;

    cursor: pointer;

    &:hover {
        animation: ${hoverAnimation} 0.2s linear forwards;
    }

    &:active {
        animation: ${clickAnimation} 0.1s linear forwards;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Function */
const createPageNumbers = (isSelected: number, pageCount: number) => {
    const pageNumbers: (number | string)[] = [];
    const maxVisiblePages = 10;

    if (pageCount <= maxVisiblePages) {
        for (let i = 1; i <= pageCount; i += 1) {
            pageNumbers.push(i);
        }
    } else if (isSelected <= Math.floor(maxVisiblePages / 2) + 1) {
        for (let i = 1; i <= maxVisiblePages - 1; i += 1) {
            pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(pageCount);
    } else if (isSelected >= pageCount - Math.floor(maxVisiblePages / 2)) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = pageCount - maxVisiblePages + 2; i <= pageCount; i += 1) {
            pageNumbers.push(i);
        }
    } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = isSelected - 3; i <= isSelected + 3; i += 1) {
            pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(pageCount);
    }

    return pageNumbers;
};

// ----------------------------------------------------------------------------------------------------

/* Pagination Bar Component */
function PaginationBar({
    pageCount,
    colorType,
    isSelected,
    setIsSelected,
    onClick,
    width = 30,
    height = 30,
    fontSize = 16,
}: PaginationBarProps) {
    const [pageNumbers, setPageNumbers] = useState<(number | string)[]>([]);

    useEffect(() => {
        const newPageNumbers = createPageNumbers(isSelected, pageCount);
        setPageNumbers(newPageNumbers);
    }, [isSelected, pageCount]);

    const handleLeftArrow = () => {
        const newValue = isSelected - 1;
        setIsSelected(newValue);
    };
    const handleRightArrow = () => {
        const newValue = isSelected + 1;
        setIsSelected(newValue);
    };

    if (pageCount > 1) {
        return (
            <PaginationBarContainer>
                <PageArrowWrapper
                    src="/assets/icons/left-arrow-icon.svg"
                    alt="pagination-left-arrow"
                    width={width}
                    height={height}
                    onClick={() => {
                        if (isSelected > 1) {
                            handleLeftArrow();
                        }
                    }}
                />
                {pageNumbers.map((num, idx) => (
                    <PageNumberWrapper
                        key={`pagination-${num}-${idx}`}
                        width={width}
                        height={height}
                        fontSize={fontSize}
                        colorType={colorType}
                        selectedNum={num === isSelected}
                        isDot={num === "..."}
                        onClick={() => {
                            if (typeof num === "number") {
                                setIsSelected(num);
                                onClick(num);
                            }
                        }}
                    >
                        {num}
                    </PageNumberWrapper>
                ))}
                <PageArrowWrapper
                    src="/assets/icons/right-arrow-icon.svg"
                    alt="pagination-right-arrow"
                    width={width}
                    height={height}
                    onClick={() => {
                        if (isSelected < pageCount) {
                            handleRightArrow();
                        }
                    }}
                />
            </PaginationBarContainer>
        );
    }
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default PaginationBar;
