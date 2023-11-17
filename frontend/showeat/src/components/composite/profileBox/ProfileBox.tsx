/* Import */
import Image from "next/image";
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
    // Position Attribute
    position: relative;

    // Box Model Attribute
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    overflow: hidden;

    // Style Attribute
    border: 1px solid ${(props) => props.theme.colors.primary3};
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.gray1};
`;

const ProfileImage = styled(Image)`
    // Box Model Attribute
    object-fit: cover;
`;

const NicknameWrapper = styled("div")`
    // Box Model Attribute
    width: 150px;
    overflow: hidden;

    // Text Attribute
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 700;
`;

// ----------------------------------------------------------------------------------------------------

/* Profile Box Component */
function ProfileBox(props: ProfileBoxProps) {
    const { source, nickname } = props;

    return (
        <ProfileContainer>
            <ProfileImageWrapper>
                <ProfileImage src={source} width={40} height={40} alt="user-profile" priority />
            </ProfileImageWrapper>
            <NicknameWrapper>{nickname}</NicknameWrapper>
        </ProfileContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ProfileBox;
