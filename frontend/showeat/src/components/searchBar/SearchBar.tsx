/* Import */
import { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { TextInput } from "../common/input";
import { MenuButton } from "../common/button";

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
const menuCategory = [
    { eng: "KOREAN", kr: "한식", imageUrl: "/assets/images/cook-cow.png" },
    { eng: "CHINESE", kr: "중식", imageUrl: "/assets/images/customer-cow.png" },
    { eng: "JAPANESE_SUSHI", kr: "일식/회", imageUrl: "/assets/images/cook-cow.png" },
    { eng: "WESTERN", kr: "양식", imageUrl: "/assets/images/customer-cow.png" },
    { eng: "CHICKEN_BURGER", kr: "치킨/버거", imageUrl: "/assets/images/cook-cow.png" },
    { eng: "ASIAN", kr: "아시안", imageUrl: "/assets/images/customer-cow.png" },
    { eng: "SNACKS_LATE_NIGHT", kr: "분식/야식", imageUrl: "/assets/images/cook-cow.png" },
    { eng: "CAFE_DESSERT", kr: "카페/디저트", imageUrl: "/assets/images/customer-cow.png" },
];

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

    const handleSearch = () => {
        console.log(searchText);
        router.push("/search");
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
                    placeholder="새로 입점한 우리 동네의 셀러와 관심 있는 메뉴를 검색해보세요!"
                    setTextValue={setSearchText}
                    iconUrl="/assets/icons/search-icon.svg"
                    onClick={handleSearch}
                />
            </SearchInputWrapper>
            <IconMenuContainer>
                {menuCategory.map((menu) => (
                    <MenuButton
                        key={menu.eng}
                        width="40px"
                        imageUrl={menu.imageUrl}
                        menuName={menu.kr}
                        onClick={() => handleMenuButton(menu.eng)}
                    />
                ))}
            </IconMenuContainer>
        </SearchBarContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SearchBar;
