/* Import */
import Header from "@components/header";
import { LayoutProps } from "@customTypes/layoutProps";

// ----------------------------------------------------------------------------------------------------

/* Seller Page Layout */
function SellerLayout(props: LayoutProps) {
    const { children } = props;

    return (
        <>
            <Header />
            <div>여기는 셀러 페이지입니다.</div>
            <article>{children}</article>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SellerLayout;
