/* Import */
import Header from "@components/header";
import styled from "@emotion/styled";
import NavigationBar from "@components/navigationBar/NavigationBar";
import { LayoutProps } from "@customTypes/layoutProps";

// ----------------------------------------------------------------------------------------------------

const BodyContainer = styled("div")`
    display: flex;

    width: 100%;
    min-height: calc(100vh-5em);
`;

/* Buyer Page Layout */
function BuyerLayout(props: LayoutProps) {
    const { children } = props;

    return (
        <>
            <Header />
            <BodyContainer>
                <NavigationBar isBuyer />
                <article>{children}</article>
            </BodyContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default BuyerLayout;
