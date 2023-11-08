/* Import */
import Header from "@/components/composite/header";
import styled from "@emotion/styled";
import NavigationBar from "@/components/composite/navigationBar/NavigationBar";
import { LayoutProps } from "@customTypes/layoutProps";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import useUserState from "@hooks/useUserState";

// ----------------------------------------------------------------------------------------------------

/* Style */
const BodyContainer = styled("div")`
    display: flex;

    width: 100%;

    min-height: calc(100vh - 5em);
`;

const NavBarWrapper = styled("div")`
    display: flex;

    width: 250px;
    height: 100%;
`;

const BorderBox = styled("div")`
    position: fixed;
    left: 0;
    top: 0;

    width: 250px;
    height: 100%;

    border-right: 1px solid ${(props) => props.theme.colors.gray2};
    box-sizing: border-box;
`;

const FlexArticle = styled("article")`
    display: flex;

    width: calc(100% - 250px);
    height: 100%;
`;

// ----------------------------------------------------------------------------------------------------

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
                <BorderBox />
                <NavBarWrapper>
                    <NavigationBar isBuyer={false} />
                </NavBarWrapper>
                <FlexArticle>{children}</FlexArticle>
            </BodyContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SellerLayout;
