/* Import */
import { LayoutProps } from "@customTypes/layoutProps";

// ----------------------------------------------------------------------------------------------------

/* Funding Page Layout */
function FundingLayout(props: LayoutProps) {
    const { children } = props;

    return (
        <>
            <div>여기는 펀딩 페이지입니다.</div>
            <article>{children}</article>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingLayout;
