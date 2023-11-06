/* Import */
import Footer from "@components/footer";
import Header from "@components/header";
import { LayoutProps } from "@customTypes/layoutProps";

// ----------------------------------------------------------------------------------------------------

/* Main Page Layout */
function MainLayout(props: LayoutProps) {
    const { children } = props;

    return (
        <>
            <Header />
            <article>{children}</article>
            <Footer />
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default MainLayout;
