/* Import */
import Header from "@/components/composite/header";
import styled from "@emotion/styled";
import NavigationBar from "@/components/composite/navigationBar/NavigationBar";
import { LayoutProps } from "@customTypes/layoutProps";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import useUserState from "@hooks/useUserState";

// ----------------------------------------------------------------------------------------------------

const BodyContainer = styled("div")`
    display: flex;

    width: 100%;
    min-height: calc(100vh-5em);
`;

/* Seller Page Layout */
function SellerLayout(props: LayoutProps) {
    const { children } = props;

    // 셀러가 아니라면 메인으로 돌려보냄

    // const router = useRouter();
    // const [user] = useUserState();

    // useEffect(() => {
    //     if (!user.userBusiness) {
    //         router.replace("/");
    //     }
    // }, []);

    return (
        <>
            <Header />
            <BodyContainer>
                <NavigationBar isBuyer={false} />
                <article>{children}</article>
            </BodyContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SellerLayout;
