/* Import */
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { MenuButton } from "@components/common/button";
import menuCategoryList from "@configs/menuCategoryList";
import styled from "@emotion/styled";
import { TextInput } from "@components/common/input";
import { useRouter } from "next/router";
import Modal from "../modal";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface SearchBarProps {
    isChange?: boolean;
    setIsChange?: React.Dispatch<React.SetStateAction<boolean>>;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const SearchBarContainer = styled("div")`
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    height: 180px;
`;

const SearchInputWrapper = styled("div")`
    display: inline-flex;
    justify-content: center;
    align-items: center;
`;

const IconMenuContainer = styled("div")`
    display: flex;
    justify-content: space-around;
    align-items: center;

    width: 960px;
`;

const RequireModalContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const RequireModalTitleWrapper = styled("span")`
    font-size: 30px;
    font-weight: 700;

    padding: 0.5em;
`;

const RequireModalDescriptionWrapper = styled("span")`
    font-size: 18px;

    padding: 2em;

    @media (max-width: 767px) {
        font-size: 14px;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Require Input Modal Component */
function RequireInputModal() {
    return (
        <RequireModalContainer>
            <RequireModalTitleWrapper>검색어를 입력해주세요.</RequireModalTitleWrapper>
            <RequireModalDescriptionWrapper>
                검색어 입력은 필수 조건입니다.
            </RequireModalDescriptionWrapper>
        </RequireModalContainer>
    );
}

/* Search Bar Button Component */
function SearchBar({ isChange = false, setIsChange }: SearchBarProps) {
    const router = useRouter();
    const [searchText, setSearchText] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleEnterKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (searchText && searchText !== "") {
                router.push(`search?keyword=${encodeURIComponent(searchText)}`);
            } else {
                setIsModalOpen(true);
            }
        }
    };

    const handleSearchClick = () => {
        if (searchText && searchText !== "") {
            router.push(`/search?keyword=${encodeURIComponent(searchText)}`);
        } else {
            setIsModalOpen(true);
        }
    };

    const handleMenuButton = (category: string) => {
        router.push(`search?category=${encodeURIComponent(category)}`);
        if (!isChange && setIsChange) {
            setIsChange(true);
        }
    };

    return (
        <SearchBarContainer>
            <SearchInputWrapper>
                <TextInput
                    width="960px"
                    id="searchbar-input"
                    value={searchText}
                    placeholder="새로 입점한 우리 동네의 셀러와 관심 있는 메뉴를 검색해보세요!"
                    source="/assets/icons/search-icon.svg"
                    onChange={handleSearchTextChange}
                    onKeyUp={handleEnterKeyUp}
                    onClick={handleSearchClick}
                />
            </SearchInputWrapper>
            <IconMenuContainer>
                {menuCategoryList.map((menu) => (
                    <MenuButton
                        key={menu.id}
                        width="40px"
                        imageUrl={menu.imageUrl}
                        menuName={menu.value}
                        onClick={() => handleMenuButton(menu.id)}
                    />
                ))}
            </IconMenuContainer>
            <Modal
                childComponent={RequireInputModal()}
                width="500px"
                height="300px"
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                buttonType="close"
                buttonWidth="200px"
                buttonHeight="50px"
                buttonFontSize={20}
            />
        </SearchBarContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SearchBar;
