/* Import */
import withAuth from "@libs/withAuth";
import styled from "@emotion/styled";
import SingleLayout from "@layouts/SingleLayout";
import { ReactNode } from "react";
import TextButton from "@components/common/button/TextButton";
import { useRouter } from "next/router";

const HeaderContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    margin: 100px;
`;

const HeaderWrapper = styled("div")`
    font-size: 50px;
    font-weight: 700;
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

const StepBox = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${(props) => props.backgroundColor};
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

function Result() {
    const router = useRouter();
    const handleButtonClick = () => {
        router.replace("/sellers/profile/seller-info");
    };

    return (
        <>
            <HeaderContainer>
                <HeaderWrapper>셀러 계정 신청</HeaderWrapper>
                <ProgressBox>
                    <StepBox backgroundColor="black" />
                    <StepLine />
                    <StepBox backgroundColor="black" />
                    <StepLine />
                    <StepBox backgroundColor="#fdb757" />
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
