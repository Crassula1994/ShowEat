/* Import */
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------------------------------------

/* Style */
const FooterContainer = styled("div")<{ isPageOverflow: boolean }>`
    position: ${(props) => (props.isPageOverflow ? "relative" : "fixed")};
    bottom: ${(props) => (props.isPageOverflow ? "none" : 0)};

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 800px;
    height: 150px;

    margin-top: 5em;

    border-top: 1px solid ${(props) => props.theme.colors.gray2};
    background-color: white;
    box-sizing: border-box;

    z-index: 200;
`;

const LogoWrapper = styled(Image)`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const ShowEatInfoContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    min-width: 400px;
    max-width: 600px;
    height: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
`;

const ShowEatTitleContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding-bottom: 0.5em;
    box-sizing: border-box;
`;

const ShowEatTitleWrapper = styled("span")<{ korean?: boolean }>`
    font-size: 20px;
    font-weight: 700;

    box-sizing: border-box;
    padding-right: ${(props) => (props.korean ? "20px" : "none")};
    padding-left: ${(props) => (props.korean ? "none" : "20px")};

    border-right: ${(props) => (props.korean ? `2px solid black` : "none")};
`;

const TeamInfoContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    width: 100%;
`;

const TeamInfoTextContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    padding: 2px 0px;
    box-sizing: border-box;
`;

const TeamInfoTitleWrapper = styled("span")`
    width: 30%;
    padding-right: 2em;
    box-sizing: border-box;

    font-size: 14px;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TeamInfoDescriptionWrapper = styled("span")`
    width: 70%;

    font-size: 14px;
    text-align: right;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const LinkInfoContainer = styled("div")`
    // Box Model Attribute
    width: 70%;
    white-space: nowrap;
    overflow: hidden;

    // Text Attribute
    font-size: 14px;
    text-align: right;
    text-overflow: ellipsis;
`;

const LinkInfoWrapper = styled("a")`
    // Text Attribute
    font-size: 14px;
    font-weight: 700;
    text-decoration: underline;
    &:link {
        color: inherit;
    }
    &:visited {
        color: inherit;
    }

    // Interaction Attribute
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

// ----------------------------------------------------------------------------------------------------

/* Footer Component */
function Footer() {
    const stackFlowURL =
        "https://crassula.notion.site/crassula/ShowEat-0585e8062752423894341133346581d6";

    const [isPageOverflow, setIsPageOverflow] = useState(false);

    useEffect(() => {
        const checkIfPageIsOverflowing = () => {
            setIsPageOverflow(document.documentElement.scrollHeight > window.innerHeight - 150);
        };
        checkIfPageIsOverflowing();

        window.addEventListener("scroll", checkIfPageIsOverflowing);

        return () => {
            window.removeEventListener("scroll", checkIfPageIsOverflowing);
        };
    }, []);

    return (
        <FooterContainer isPageOverflow={isPageOverflow}>
            <LogoWrapper
                src="/assets/images/team-logo.svg"
                width={150}
                height={150}
                alt="team-logo"
                priority
            />
            <ShowEatInfoContainer>
                <ShowEatTitleContainer>
                    <ShowEatTitleWrapper korean>쑈잇</ShowEatTitleWrapper>
                    <ShowEatTitleWrapper>ShowEat</ShowEatTitleWrapper>
                </ShowEatTitleContainer>
                <TeamInfoContainer>
                    <TeamInfoTextContainer>
                        <TeamInfoTitleWrapper>COPYRIGHT</TeamInfoTitleWrapper>
                        <TeamInfoDescriptionWrapper>
                            Copyright 2023. Team Stackflow. All Rights Reserved.
                        </TeamInfoDescriptionWrapper>
                    </TeamInfoTextContainer>
                    <TeamInfoTextContainer>
                        <TeamInfoTitleWrapper>TEAM MEMBER</TeamInfoTitleWrapper>
                        <TeamInfoDescriptionWrapper>
                            김하림 | 고건 | 구본웅 | 문수정 | 박시균 | 오유정
                        </TeamInfoDescriptionWrapper>
                    </TeamInfoTextContainer>
                    <TeamInfoTextContainer>
                        <TeamInfoTitleWrapper>ADDRESS</TeamInfoTitleWrapper>
                        <TeamInfoDescriptionWrapper>
                            서울특별시 강남구 역삼동 테헤란로 21, 멀티캠퍼스 역삼 802호
                        </TeamInfoDescriptionWrapper>
                    </TeamInfoTextContainer>
                    <TeamInfoTextContainer>
                        <TeamInfoTitleWrapper>LINK</TeamInfoTitleWrapper>
                        <LinkInfoContainer>
                            <LinkInfoWrapper>개인정보 처리 방침</LinkInfoWrapper> |{" "}
                            <LinkInfoWrapper>서비스 이용 약관</LinkInfoWrapper> |{" "}
                            <LinkInfoWrapper href={stackFlowURL}>About Stackflow</LinkInfoWrapper>
                        </LinkInfoContainer>
                    </TeamInfoTextContainer>
                </TeamInfoContainer>
            </ShowEatInfoContainer>
        </FooterContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Footer;
