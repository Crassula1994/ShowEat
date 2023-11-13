/* Import */
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { MenuButton } from "@components/common/button";
import menuCategoryList from "@configs/menuCategoryList";
import styled from "@emotion/styled";
import { TextInput } from "@components/common/input";
import { useRouter } from "next/router";

// ----------------------------------------------------------------------------------------------------

/* Type */
// interface SearchBarProps {
//     keyword: string;
//     searchType: string[];
//     page: number;
//     category?: string[];
//     address?: string[];
//     maxPrice?: number;
//     minPrice?: number;
//     sortType?: string;
// }

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

// ----------------------------------------------------------------------------------------------------

/* Search Bar Button Component */
function SearchBar() {
    const router = useRouter();
    const [searchText, setSearchText] = useState<string>("");

    const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        console.log(searchText);
        // router.push("/search");
    };

    const handleEnterKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            router.push(`search?keyword=${encodeURIComponent(searchText)}`);
        }
    };

    const handleSearchClick = () => {
        router.push(`/search?keyword=${encodeURIComponent(searchText)}`);
    };

    const handleMenuButton = (menu: string) => {
        console.log(menu);
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
        </SearchBarContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SearchBar;
