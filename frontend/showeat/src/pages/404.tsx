/* Import */
import MainLayout from "@layouts/MainLayout";
import Image from "next/image";
import { ReactNode } from "react";
import styled from "@emotion/styled";
import { TextButton } from "@components/common/button";
import { useRouter } from "next/router";
import withAuth from "@libs/withAuth";
import Head from "next/head";

// ----------------------------------------------------------------------------------------------------

/* Style */
const ErrorContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;

    // Box Model Attribute
    width: 100vw;
    height: calc(100vh - 310.2px);

    // Styel Attribute
    background-color: white;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const ErrorBox = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3em;

    // Box Model Attribute
    margin-top: 2em;
`;

const HeaderWrapper = styled("div")`
    // Text Attribute
    font-weight: 900;
    font-size: 200px;
    color: ${(props) => props.theme.colors.primary3};
`;

const DescriptionWrapper = styled("div")`
    // Text Attribute
    font-weight: 700;
    font-size: 30px;
`;

const ButtonWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    justify-content: center;
    align-items: center;

    // Box Model Attribute
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Not Found Error Page */
function NotFound() {
    // States and Variables
    const router = useRouter();

    return (
        <>
            <Head>
                <title>404: 페이지가 없소</title>
                <meta name="description" content="찾으시는 페이지가 없습니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <ErrorContainer>
                <ErrorBox>
                    <Image
                        src="/assets/images/angry-cook-cow.png"
                        width={200}
                        height={200}
                        alt="angry-cook-cow"
                        priority
                    />
                    <HeaderWrapper>404</HeaderWrapper>
                </ErrorBox>
                <DescriptionWrapper>페이지가 없소!</DescriptionWrapper>
                <ButtonWrapper>
                    <TextButton width="15%" onClick={router.back} text="이전으로 돌아가기" />
                </ButtonWrapper>
            </ErrorContainer>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const NotFoundWithAuth = withAuth({ WrappedComponent: NotFound });

// ----------------------------------------------------------------------------------------------------

/* Layout */
NotFoundWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default NotFoundWithAuth;
