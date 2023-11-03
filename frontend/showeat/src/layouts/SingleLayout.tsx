/* Import */
import Header from "@components/header";
import { LayoutProps } from "@customTypes/layoutProps";

// ----------------------------------------------------------------------------------------------------

/* Single Page Layout */
function SingleLayout(props: LayoutProps) {
    const { children } = props;

    return (
        <>
            <Header />
            <article>{children}</article>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SingleLayout;
