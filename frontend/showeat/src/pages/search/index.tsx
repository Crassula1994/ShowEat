/* Import */
// import Head from "next/head";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/css";
import MainLayout from "@layouts/MainLayout";
import {
    ReactNode,
    useState,
    //  useEffect,
} from "react";
import withAuth from "@libs/withAuth";
import SearchBar from "@/components/composite/searchBar/SearchBar";
import { TextButton, ScrollButton } from "@components/common/button";
import Card from "@/components/composite/card";
import { useRouter } from "next/router";
import { CheckBox } from "@components/common/input";
import MultiSlider from "@/components/composite/multiSlider/MultiSlider";
// import useUserState from "@hooks/useUserState";

// ----------------------------------------------------------------------------------------------------

/* Temporary Data */
const fundingDatas = [
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 1,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1324,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
    {
        fundingId: 2,
        title: "Latte is horse",
        businessName: "야미화니커피",
        category: "카페",
        maxLimit: 20,
        minLimit: 10,
        curCount: 12,
        menu: "카페라떼",
        price: 2500,
        discountPrice: 2000,
        discountRate: 20,
        startDate: "2023-10-20",
        endDate: "2023-11-30",
        fundingIsActive: "ACTIVE",
        fundingIsSuccess: "SUCCESS",
        fundingImageResponseDtos: [
            {
                imageId: 1325,
                imageUrl: "/assets/images/ad/dog.jpeg",
            },
        ],
        fundingIsBookmark: true,
    },
];

// ----------------------------------------------------------------------------------------------------

/* Style */
const slideIn = keyframes`
  from {
      max-height: 50%;
      opacity: 0;
  }
  to {
      max-height: 100%;
      opacity: 1;
  }
`;

const SearchPageWrapper = styled("div")`
    display: flex;
    justify-content: center;
`;

const MainContentsContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 1080px;

    padding: 4em 0em;
`;

const SearchResultContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 4em;
`;

const SearchHeaderContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    padding-bottom: 0.5em;

    border-bottom: 1px solid ${(props) => props.theme.colors.gray3};
`;

const SearchResultHeaderContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
`;

const ResultTitleContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    padding-bottom: 0.5em;
`;

const ResultKeywordWrapper = styled("span")`
    font-size: 26px;
    font-weight: 700;
`;

const SearchResultWrapper = styled("span")`
    font-size: 22px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.gray4};
`;

const ResultDescriptionWrapper = styled("span")`
    font-size: 16px;
    color: ${(props) => props.theme.colors.gray4};
`;

const ResultCountWrapper = styled("span")`
    font-weight: 700;
    color: black;
`;

const FilterButtonContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FilterContainer = styled("div")`
    width: 100%;
    /* height: 800px; */
`;

const FilterSlideInContainer = styled("div")<{ isFilterd: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 1em 0;

    border-bottom: 1px solid ${(props) => props.theme.colors.gray3};

    overflow: hidden;

    animation: ${slideIn} 0.3s ease-in-out;
`;

const FilterOneContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    width: 100%;

    padding: 1em 0;
`;

const FilterTitleWrapper = styled("span")`
    padding-bottom: 0.5em;

    font-size: 20px;
    font-weight: 700;
`;

const PriceRangeContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 2em 2em;
    box-sizing: border-box;

    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 10px;
`;

const PriceRangeInputContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PriceInputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PriceLabeltWrapper = styled("span")`
    font-weight: 700;
`;

const PriceInputWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1em 2em;

    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 10px;
`;

const PriceSpaceWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100px;

    font-size: 50px;
    font-weight: 300;
`;

const FilterBodyContainer = styled("div")`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1em;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 2em 2em;
    box-sizing: border-box;

    border: 1px solid ${(props) => props.theme.colors.gray3};
    border-radius: 10px;
`;

const SortContainer = styled("div")`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    width: 100%;

    padding: 1em 0;
`;

const SortButtonWrapper = styled("div")<{ isSelected: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0 1em;

    font-size: 16px;
    font-weight: ${(props) => props.isSelected && 700};
    color: ${(props) => !props.isSelected && props.theme.colors.gray4};

    cursor: pointer;
`;

const SearchBodyContainer = styled("div")`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    max-width: 1080px;

    padding: 1em 0;
`;

const SearchCardWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MoreButtonWrapper = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding-top: 2em;
`;

// ----------------------------------------------------------------------------------------------------

/* Search Component */
function Search() {
    const [filterCondition, setFilterCondition] = useState([
        { value: "BUSINESS_NAME", text: "상호명", isChecked: false },
        { value: "FUNDING_MENU", text: "펀딩 메뉴", isChecked: false },
        { value: "FUNDING_TAG", text: "검색용 태그", isChecked: false },
    ]);
    const [filterCategory, setFilterCategory] = useState([
        { value: "KOREAN", text: "한식", isChecked: false },
        { value: "CHINESE", text: "중식", isChecked: false },
        { value: "JAPANESE_SUSHI", text: "일식/회", isChecked: false },
        { value: "WESTERN", text: "양식", isChecked: false },
        { value: "CHICKEN_BURGER", text: "치킨/버거", isChecked: false },
        { value: "ASIAN", text: "아시안", isChecked: false },
        { value: "SNACKS_LATE_NIGHT", text: "분식/야식", isChecked: false },
        {
            value: "CAFE_DESSERT",
            text: "카페/디저트",
            isChecked: false,
        },
    ]);
    const [filterAddress, setFilterAddress] = useState([
        {
            value: "서울특별시 강남구",
            text: "강남구",
            isChecked: false,
        },
        { value: "서울특별시 강동구", text: "강동구", isChecked: false },
        { value: "서울특별시 강북구", text: "강북구", isChecked: false },
        { value: "서울특별시 강서구", text: "강서구", isChecked: false },
        { value: "서울특별시 관악구", text: "관악구", isChecked: false },
        { value: "서울특별시 광진구", text: "광진구", isChecked: false },
        { value: "서울특별시 구로구", text: "구로구", isChecked: false },
        { value: "서울특별시 금천구", text: "금천구", isChecked: false },
        { value: "서울특별시 노원구", text: "노원구", isChecked: false },
        { value: "서울특별시 도봉구", text: "도봉구", isChecked: false },
        { value: "서울특별시 동대문구", text: "동대문구", isChecked: false },
        { value: "서울특별시 동작구", text: "동작구", isChecked: false },
        { value: "서울특별시 마포구", text: "마포구", isChecked: false },
        { value: "서울특별시 서대문구", text: "서대문구", isChecked: false },
        { value: "서울특별시 서초구", text: "서초구", isChecked: false },
        { value: "서울특별시 성동구", text: "성동구", isChecked: false },
        { value: "서울특별시 성북구", text: "성북구", isChecked: false },
        { value: "서울특별시 송파구", text: "송파구", isChecked: false },
        { value: "서울특별시 양천구", text: "양천구", isChecked: false },
        { value: "서울특별시 영등포구", text: "영등포구", isChecked: false },
        { value: "서울특별시 용산구", text: "용산구", isChecked: false },
        { value: "서울특별시 은평구", text: "은평구", isChecked: false },
        { value: "서울특별시 종로구", text: "종로구", isChecked: false },
        { value: "서울특별시 중구", text: "중구", isChecked: false },
        { value: "서울특별시 중랑구", text: "중랑구", isChecked: false },
    ]);

    const sortList = [
        { type: "POPULARITY", text: "👍 인기 대박" },
        { type: "CLOSING_SOON", text: "⏰ 마감 임박" },
        { type: "LOW_PRICE", text: "💸 저렴한 가격" },
        { type: "HIGH_DISCOUNT_RATE", text: "📈 높은 할인율" },
        // { text: "😍 높은 재방문율" },
    ];

    const router = useRouter();

    const [isFilterd, setIsFiltered] = useState<boolean>(false);
    const [isSelectedSort, setIsSelectedSort] = useState<string>("POPULARITY");

    const handleSort = (type: string) => {
        setIsSelectedSort(type);
    };

    const handleCard = (fundingId: number) => {
        router.push(`/fundings/${fundingId}`);
    };

    const handleBookmark = (fundingId: number) => {
        // postBookmark(fundingId);
        console.log(fundingId);
    };

    return (
        <SearchPageWrapper>
            <MainContentsContainer>
                <SearchBar />
                <SearchResultContainer>
                    <SearchHeaderContainer>
                        <SearchResultHeaderContainer>
                            <ResultTitleContainer>
                                <ResultKeywordWrapper>커피</ResultKeywordWrapper>
                                <SearchResultWrapper>&nbsp; 검색 결과</SearchResultWrapper>
                            </ResultTitleContainer>
                            <ResultDescriptionWrapper>
                                총 <ResultCountWrapper>125건</ResultCountWrapper>의 결과가
                                검색되었어요!
                            </ResultDescriptionWrapper>
                        </SearchResultHeaderContainer>
                        <FilterButtonContainer>
                            {!isFilterd ? (
                                <TextButton
                                    text="필터링"
                                    width="150px"
                                    fill="negative"
                                    colorType="secondary"
                                    onClick={() => setIsFiltered(true)}
                                />
                            ) : (
                                <TextButton
                                    text="필터링"
                                    width="150px"
                                    fill="positive"
                                    colorType="secondary"
                                    onClick={() => setIsFiltered(false)}
                                />
                            )}
                        </FilterButtonContainer>
                    </SearchHeaderContainer>
                    {isFilterd && (
                        <FilterContainer>
                            <FilterSlideInContainer isFilterd={isFilterd}>
                                <FilterOneContainer>
                                    <FilterTitleWrapper>검색 조건</FilterTitleWrapper>
                                    <FilterBodyContainer>
                                        {filterCondition.map((filter) => (
                                            <CheckBox
                                                key={`${filter.text}`}
                                                text={filter.text}
                                                width="100%"
                                                fontSize="14px"
                                                id={`${filter.text}`}
                                                isChecked={filter.isChecked}
                                                onToggle={() => {
                                                    const filterIdx = filterCondition.findIndex(
                                                        (item) => item.value === filter.value,
                                                    );
                                                    const updatedConditions = [...filterCondition];
                                                    updatedConditions[filterIdx].isChecked =
                                                        !filterCondition[filterIdx].isChecked;
                                                    setFilterCondition(updatedConditions);
                                                }}
                                            />
                                        ))}
                                    </FilterBodyContainer>
                                </FilterOneContainer>
                                <FilterOneContainer>
                                    <FilterTitleWrapper>메뉴 카테고리</FilterTitleWrapper>
                                    <FilterBodyContainer>
                                        {filterCategory.map((filter) => (
                                            <CheckBox
                                                key={`${filter.text}`}
                                                text={filter.text}
                                                width="100%"
                                                fontSize="14px"
                                                id={`${filter.text}`}
                                                isChecked={filter.isChecked}
                                                onToggle={() => {
                                                    const filterIdx = filterCategory.findIndex(
                                                        (item) => item.value === filter.value,
                                                    );
                                                    const updatedCategorys = [...filterCategory];
                                                    updatedCategorys[filterIdx].isChecked =
                                                        !filterCategory[filterIdx].isChecked;
                                                    setFilterCategory(updatedCategorys);
                                                }}
                                            />
                                        ))}
                                    </FilterBodyContainer>
                                </FilterOneContainer>
                                <FilterOneContainer>
                                    <FilterTitleWrapper>펀딩 지역</FilterTitleWrapper>
                                    <FilterBodyContainer>
                                        {filterAddress.map((filter) => (
                                            <CheckBox
                                                key={`${filter.text}`}
                                                text={filter.text}
                                                width="100%"
                                                fontSize="14px"
                                                id={`${filter.text}`}
                                                isChecked={filter.isChecked}
                                                onToggle={() => {
                                                    const filterIdx = filterAddress.findIndex(
                                                        (item) => item.value === filter.value,
                                                    );
                                                    const updatedAddresss = [...filterAddress];
                                                    updatedAddresss[filterIdx].isChecked =
                                                        !filterAddress[filterIdx].isChecked;
                                                    setFilterAddress(updatedAddresss);
                                                }}
                                            />
                                        ))}
                                    </FilterBodyContainer>
                                </FilterOneContainer>
                                <FilterOneContainer>
                                    <FilterTitleWrapper>펀딩 가격</FilterTitleWrapper>

                                    <PriceRangeContainer>
                                        <PriceRangeInputContainer>
                                            <PriceInputContainer>
                                                <PriceLabeltWrapper>최저가</PriceLabeltWrapper>
                                                <PriceInputWrapper>여기는</PriceInputWrapper>
                                            </PriceInputContainer>
                                            <PriceSpaceWrapper>∼</PriceSpaceWrapper>
                                            <PriceInputContainer>
                                                <PriceLabeltWrapper>최고가</PriceLabeltWrapper>
                                                <PriceInputWrapper>일단 포기</PriceInputWrapper>
                                            </PriceInputContainer>
                                        </PriceRangeInputContainer>
                                        <MultiSlider />
                                    </PriceRangeContainer>
                                </FilterOneContainer>
                                <TextButton colorType="secondary" text="상세 검색" width="300px" />
                            </FilterSlideInContainer>
                        </FilterContainer>
                    )}
                    <SortContainer>
                        {sortList.map((sort) => (
                            <SortButtonWrapper
                                key={`sort-${sort.type}`}
                                isSelected={isSelectedSort === sort.type}
                                onClick={() => handleSort(sort.type)}
                            >
                                {sort.text}
                            </SortButtonWrapper>
                        ))}
                    </SortContainer>
                    <SearchBodyContainer>
                        {fundingDatas.map((data, idx) => (
                            <SearchCardWrapper key={`${data.title}-${idx}`}>
                                <Card
                                    fundingData={data}
                                    onFundingClick={() => handleCard(data.fundingId)}
                                    onBookmark={() => handleBookmark(data.fundingId)}
                                />
                            </SearchCardWrapper>
                        ))}
                    </SearchBodyContainer>
                    <MoreButtonWrapper>
                        <TextButton
                            text="더 보기"
                            width="400px"
                            height="50px"
                            colorType="secondary"
                            curve="round"
                            fontSize={20}
                        />
                    </MoreButtonWrapper>
                </SearchResultContainer>
            </MainContentsContainer>
            <ScrollButton width="40px" />
        </SearchPageWrapper>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const SignInWithAuth = withAuth({ WrappedComponent: Search });

// ----------------------------------------------------------------------------------------------------

/* Layout */

SignInWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default SignInWithAuth;
