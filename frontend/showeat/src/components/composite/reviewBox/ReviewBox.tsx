/* Import */
import { getCategoryValue, getTimeAgo } from "@utils/format";
import Image from "next/image";
import ProfileBox from "@components/composite/profileBox";
import { ReviewType } from "@customTypes/apiProps";
import styled from "@emotion/styled";
import TextBox from "@components/common/textBox";
import { useRouter } from "next/router";
import useUserState from "@hooks/useUserState";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface ReviewBoxProps {
    reviewData: ReviewType;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ReviewContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;

    // Box Model Attribute
    width: 100%;
`;

const ReviewHeaderContainer = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: space-between;

    // Box Model Attribute
    width: 100%;
`;

const CreatedAtWrapper = styled("div")`
    // Box Model Attribute
    width: 20%;

    // Style Attribute
    color: ${(props) => props.theme.colors.gray3};
`;

const ButtonContainer = styled("div")<{ isOwn: boolean }>`
    // Layout Attribute
    display: flex;
    gap: 1em;

    // Style Attribute
    visibility: ${(props) => (props.isOwn ? "visible" : "hidden")};

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const ImageButton = styled(Image)`
    // Interaction Attribute
    cursor: pointer;
`;

const FundingBox = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    justify-content: space-between;

    // Box Model Attribute
    width: 50%;
    box-sizing: border-box;
    padding: 0.5em 1em;

    // Style Attribute
    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 20px;

    // Interaction Attribute
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const TextContainer = styled("div")`
    // Layout Attribute
    display: flex;
    flex-direction: column;
`;

// ----------------------------------------------------------------------------------------------------

/* Review Box Component */
function ReviewBox(props: ReviewBoxProps) {
    // States and Variables
    const { reviewData } = props;
    const router = useRouter();
    const [user] = useUserState();
    const {
        message,
        modifiedDate,
        userId,
        userNickname,
        userImgUrl,
        fundingId,
        fundingTitle,
        fundingCategory,
        fundingMenu,
    } = reviewData;

    return (
        <ReviewContainer>
            <ReviewHeaderContainer>
                <ProfileBox source={userImgUrl} nickname={userNickname} />
                <CreatedAtWrapper>{getTimeAgo(modifiedDate)}</CreatedAtWrapper>
                <ButtonContainer isOwn={user.userId === userId}>
                    <ImageButton
                        src="/assets/icons/modify-icon.svg"
                        width={30}
                        height={30}
                        alt="modify-icon"
                    />
                    <ImageButton
                        src="/assets/icons/delete-icon.svg"
                        width={30}
                        height={30}
                        alt="delete-icon"
                    />
                </ButtonContainer>
                <FundingBox onClick={() => router.push(`/fundings/${fundingId}/store`)}>
                    <TextContainer>
                        <div>
                            <b>{fundingTitle}</b>
                        </div>
                        <div>
                            {getCategoryValue(fundingCategory)}&nbsp;&nbsp; | &nbsp;&nbsp;
                            {fundingMenu}
                        </div>
                    </TextContainer>
                    <Image
                        src="/assets/icons/right-arrow-icon.svg"
                        width={30}
                        height={30}
                        alt="right-arrow-icon"
                    />
                </FundingBox>
            </ReviewHeaderContainer>
            <TextBox text={message} />
        </ReviewContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ReviewBox;
