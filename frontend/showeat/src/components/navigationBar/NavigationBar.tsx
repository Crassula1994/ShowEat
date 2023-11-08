/* import */
import useUserState from "@hooks/useUserState";
import useSellerState from "@/hooks/useSellerState";
import styled from "@emotion/styled";
import Image from "next/image";
import { TextButton } from "@components/common/button";
import navbarMenu from "@/configs/navbarMenu";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface NavigationBarProps {
    isBuyer: boolean;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const NavigationBarContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 300px;
    height: 100%;

    left: 0;

    padding: 2em 0;

    border-right: 1px solid ${(props) => props.theme.colors.gray2};

    box-sizing: border-box;
`;

const ProfileBoxContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    padding: 0.5em 0;
`;

const ProfileImageWrapper = styled("div")`
    position: relative;
    width: 150px;
    height: 150px;

    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 50%;
`;

const ProfileImage = styled(Image)`
    border-radius: 50%;
`;

const ProfileNickname = styled("span")`
    font-size: 22px;
    font-weight: 700;

    margin-top: 0.5em;
`;

const PointContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 1em 0;
`;

const PointHeader = styled("div")`
    text-align: center;

    width: 150px;

    padding: 0.2em;

    border-bottom: 1px solid ${(props) => props.theme.colors.gray3};
`;

const HoldingPointContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 150px;

    padding: 0.8em 0;
`;

const CashCowIcon = styled(Image)`
    padding-right: 0.5em;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const HoldingPoint = styled("span")<{ fontSize: string }>`
    font-size: ${(props) => props.fontSize};
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const CreateFundingButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1em 0;
`;

const MenuContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2em 0;
`;

const MenuWrapper = styled("div")<{ isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 150px;
    height: 30px;

    margin: 10px 0;

    font-size: ${(props) => (props.isSelected ? "22px" : "18px")};
    font-weight: ${(props) => (props.isSelected ? 700 : 500)};

    border-right: ${(props) => props.isSelected && `4px solid ${props.theme.colors.gray5}`};

    cursor: pointer;
`;

// ----------------------------------------------------------------------------------------------------

/* Function */
function calculateFontSize(number: number) {
    if (number >= 1000000000) {
        return "12px";
    }
    if (number >= 1000000) {
        return "16px";
    }
    return "18px";
}

// ----------------------------------------------------------------------------------------------------

/* Navigation Bar Component */
function NavigationBar({ isBuyer }: NavigationBarProps) {
    const router = useRouter();

    const [user] = useUserState();
    const [seller] = useSellerState();

    const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

    const menuList = navbarMenu(isBuyer);

    const holdingPoint = 200000000;
    const pointFontSize = calculateFontSize(holdingPoint);
    const formattedHoldingPoint = holdingPoint.toLocaleString();

    useEffect(() => {
        const currentUrl = router.pathname;

        menuList.forEach((menu) => {
            if (menu.contain.includes(currentUrl)) {
                setSelectedMenu(menu.text);
            }
        });
    }, []);

    const handleMenu = (menu: { text: string; link: string; contain: string[] }) => {
        setSelectedMenu(menu.text);
        // 일단 메뉴 버튼 안에서 이동은 replace로
        router.replace(`${menu.link}`);
    };

    const handleCreateFunding = () => {
        router.push("/buyers/funding-form");
    };

    const handleCharge = () => {
        router.push("/buyers/pay");
    };

    return (
        <NavigationBarContainer>
            <ProfileBoxContainer>
                <ProfileImageWrapper>
                    <ProfileImage
                        src={isBuyer ? user.userImgUrl : seller.sellerImgUrl}
                        alt="profile-img"
                        fill
                    />
                </ProfileImageWrapper>
                <ProfileNickname>
                    {isBuyer
                        ? user.userNickname || "닉네임 정보가 없습니다."
                        : seller.sellerName || "가게 이름이 없습니다."}
                </ProfileNickname>
            </ProfileBoxContainer>
            {isBuyer ? (
                <PointContainer>
                    <PointHeader>보유한 캐시카우</PointHeader>
                    <HoldingPointContainer>
                        <CashCowIcon
                            src="/assets/images/cash-cow-coin.png"
                            alt="cash-cow"
                            width={40}
                            height={40}
                        />
                        <HoldingPoint fontSize={pointFontSize}>
                            {formattedHoldingPoint}
                        </HoldingPoint>
                    </HoldingPointContainer>
                    <TextButton
                        text="캐시카우 충전"
                        width="150px"
                        height="30px"
                        colorType="primary"
                        fontSize={14}
                        onClick={handleCharge}
                    />
                </PointContainer>
            ) : (
                <CreateFundingButtonWrapper>
                    <TextButton
                        text="펀딩 생성"
                        width="200px"
                        colorType="primary"
                        onClick={handleCreateFunding}
                    />
                </CreateFundingButtonWrapper>
            )}

            <MenuContainer>
                {menuList.map((menu, idx) => (
                    <MenuWrapper
                        key={`${menu.text}-${idx}`}
                        onClick={() => handleMenu(menu)}
                        isSelected={selectedMenu === menu.text}
                    >
                        {menu.text}
                    </MenuWrapper>
                ))}
            </MenuContainer>
        </NavigationBarContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default NavigationBar;
