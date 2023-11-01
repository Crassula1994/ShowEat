/* Import */
import { LayoutProps } from "@customTypes/layoutProps";

// ----------------------------------------------------------------------------------------------------

/* Buyer Page Layout */
function BuyerLayout(props: LayoutProps) {
    const { children } = props;

    return (
        <>
            <div>여기는 바이어 페이지입니다.</div>
            <article>{children}</article>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default BuyerLayout;
