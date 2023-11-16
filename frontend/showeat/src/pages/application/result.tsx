/* Import */
import withAuth from "@libs/withAuth";
import styled from "@emotion/styled";
import SingleLayout from "@layouts/SingleLayout";
import { ReactNode } from "react";
import TextButton from "@components/common/button/TextButton";
import { useRouter } from "next/router";
import Head from "next/head";

// ----------------------------------------------------------------------------------------------------

/* Style */
const HeaderContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin: 100px;
`;

const HeaderWrapper = styled("div")`
    font-size: 40px;
    font-weight: 900;
    text-align: center;
    width: 800px;
    height: 60px;
`;

const ProgressBox = styled("div")`
    display: flex;
    width: 400px;
    justify-content: space-between;
    align-items: center;
`;

const StepBox = styled("div")<{ colorType: "black" | "primary" }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${(props) =>
        props.colorType === "black" ? "black" : `${props.theme.colors.primary3}`};
`;

const StepLine = styled.div`
    width: 100px;
    height: 1px;
    flex-shrink: 0;

    border-radius: 2px;
    background-color: black;
`;

const ResultBox = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 80px;
`;

const ResulWrapper = styled("div")`
    font-size: 30px;
    font-weight: 700;
`;

const ButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
`;

// ----------------------------------------------------------------------------------------------------

/* Result Component */
function Result() {
    const router = useRouter();
    const handleButtonClick = () => {
        router.replace("/sellers/profile/seller-info");
    };

    return (
        <>
            <Head>
                <title>셀러 등록 결과</title>
                <meta name="description" content="셀러 등록이 성공적으로 완료되었습니다." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <HeaderContainer>
                <HeaderWrapper>셀러 계정 신청</HeaderWrapper>
                <ProgressBox>
                    <StepBox colorType="black" />
                    <StepLine />
                    <StepBox colorType="black" />
                    <StepLine />
                    <StepBox colorType="primary" />
                </ProgressBox>
            </HeaderContainer>
            <ResultBox>
                <ResulWrapper>계정 신청이 성공적으로 완료되었습니다.</ResulWrapper>
                <ButtonWrapper>
                    <TextButton
                        type="submit"
                        width="200px"
                        text="돌아가기"
                        onClick={handleButtonClick}
                    />
                </ButtonWrapper>
            </ResultBox>
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const ResultWithAuth = withAuth({ WrappedComponent: Result, guardType: "USER_ONLY" });

// ----------------------------------------------------------------------------------------------------

/* Layout */
ResultWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <SingleLayout>{page}</SingleLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ResultWithAuth;
