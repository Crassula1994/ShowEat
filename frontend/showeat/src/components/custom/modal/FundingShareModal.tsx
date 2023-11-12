/* Import */
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LineIcon,
    LineShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "next-share";
import Image from "next/image";
import styled from "@emotion/styled";
import { TextInput } from "@components/common/input";
import { useEffect } from "react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface FundingShareModalProps {
    fundingId: string;
    title: string;
    menu: string;
    imageUrl: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ModalContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2em;
`;

const CopyLinkButtonWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: 100%;
    margin-top: 0.5em;
`;

const ShareButtonContainer = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    // Box Model Attribute
    width: 100%;
`;

const KakaoTalkButtonWrapper = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: center;

    // Box Model Attribute
    width: 50px;
    height: 50px;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.kakao};
    border-radius: 50%;

    // Interaction Attribute
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

// ----------------------------------------------------------------------------------------------------

/* Funding Share Modal Component */
function FundingShareModal(props: FundingShareModalProps) {
    // States and Variables
    const { fundingId, title, menu, imageUrl } = props;
    const shareUrl: string = `https://showeat.kr/fundings/${fundingId}/store`;
    const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

    // Function for Copying Funding Link to Clipboard
    const copyFundingLink = () => {
        navigator.clipboard.writeText(shareUrl);
    };

    // Function for Sharing Funding Link with Kakao API
    const shareWithKakao = () => {
        const { Kakao } = window;
        Kakao.Share.sendDefault({
            objectType: "feed",
            content: {
                title,
                imageUrl,
                link: {
                    mobileWebUrl: shareUrl,
                    webUrl: shareUrl,
                },
                description: menu,
            },
        });
    };

    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(KAKAO_API_KEY);
        }
    }, []);

    return (
        <ModalContainer>
            <CopyLinkButtonWrapper>
                <TextInput
                    width="90%"
                    id="funding-link"
                    value={shareUrl}
                    source="/assets/icons/copy-icon.svg"
                    onClick={copyFundingLink}
                />
            </CopyLinkButtonWrapper>
            <ShareButtonContainer>
                <KakaoTalkButtonWrapper onClick={shareWithKakao}>
                    <Image
                        src="/assets/icons/kakao-icon.svg"
                        alt="kakao-icon"
                        width={30}
                        height={30}
                    />
                </KakaoTalkButtonWrapper>
                <LineShareButton url={shareUrl}>
                    <LineIcon size={50} round />
                </LineShareButton>
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={50} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={50} round />
                </TwitterShareButton>
                <EmailShareButton url={shareUrl}>
                    <EmailIcon size={50} round />
                </EmailShareButton>
            </ShareButtonContainer>
        </ModalContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingShareModal;
