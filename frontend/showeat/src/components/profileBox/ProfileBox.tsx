/* Import */
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface ProfileBoxProps {
    source: string;
    nickname: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ProfileContainer = styled("div")`
    // Layout Attribute
    display: flex;
    align-items: center;
    gap: 0.5em;

    // Interaction Attribute
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
`;

const ProfileImageWrapper = styled("div")`
    // Box Model Attribute
    width: 40px;
    height: 40px;

    // Style Attribute
    border: 1px solid ${(props) => props.theme.colors.primary3};
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.gray1};
`;

const ProfileImage = styled("img")`
    // Box Model Attribute
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const NicknameWrapper = styled("div")`
    // Text Attribute
    font-weight: 700;
`;

// ----------------------------------------------------------------------------------------------------

/* Profile Box Component */
function ProfileBox(props: ProfileBoxProps) {
    const { source, nickname } = props;

    return (
        <ProfileContainer>
            <ProfileImageWrapper>
                <ProfileImage src={source} alt="user-profile" />
            </ProfileImageWrapper>
            <NicknameWrapper>{nickname}</NicknameWrapper>
        </ProfileContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ProfileBox;
