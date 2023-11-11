/* Import */
import { TextArea, TextInput } from "@components/common/input";
import MainLayout from "@layouts/MainLayout";
import styled from "@emotion/styled";
import withAuth from "@libs/withAuth";
import { ChangeEvent, ReactNode, useState, SetStateAction, useEffect } from "react";
import { InputDropdown } from "@components/common/dropdown";
import { TagButton, TextButton } from "@components/common/button";
import menuCategory from "@configs/menuCategory";
import Image from "next/image";
import { changeFontWeight } from "@utils/format";
import Modal from "@components/composite/modal";
import FileInput from "@components/common/input/FileInput";
import { addNewMenu, getMenuList } from "@apis/menu";
import { createFunding } from "@/apis/fundings";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TextFormDataType {
    type: string;
    text: string;
    data: string;
    dataType: string;
}

interface ModalDataType {
    menuName: string;
    setMenuName: React.Dispatch<SetStateAction<string>>;
    originPrice: string;
    setOriginPrice: React.Dispatch<SetStateAction<string>>;
    uploadedFiles: File[];
    setUploadedFiles: React.Dispatch<SetStateAction<File[]>>;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const FundingFormContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-width: 920px;
`;

const TitleWrapper = styled("div")`
    font-size: 30px;
    font-weight: 700;

    padding: 1em 0;
`;

const FormContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 700px;
`;

const InputContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 50px;
`;

const InputLabel = styled("label")`
    width: 150px;

    font-size: 18px;
    font-weight: 700;
`;

const MultiInputContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 500px;
`;

const TextAreaLabel = styled("label")`
    width: 150px;

    font-size: 18px;
    font-weight: 700;

    padding-top: 0.3em;
`;

const TextAreaContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: start;

    width: 100%;
    height: 150px;

    padding-top: 0.4em;
`;

const DateInput = styled("input")`
    width: 250px;

    box-sizing: border-box;
    padding: 0.45em 1em;

    border: 2px solid ${(props) => props.theme.colors.gray3};
    outline: none;
    border-radius: 15px;
    &:focus {
        border-color: transparent;
        box-shadow:
            0 0 5px 2px ${(props) => props.theme.colors.primary2},
            0 0 0 2px ${(props) => props.theme.colors.primary3};
    }

    ::-webkit-calendar-picker-indicator {
        width: 20px;
        height: 20px;
    }
`;

const RemainDateWrapper = styled("span")`
    font-size: 18px;
`;

const DropDownWrapper = styled("div")`
    width: 370px;
`;

const CategoryDropDownWrapper = styled("div")`
    width: 500px;
`;

const TagsContainer = styled("div")`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;

    justify-content: flex-start;
    align-items: center;

    width: 500px;
`;

const TagContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: end;

    width: 95px;
`;

const DeleteIconWrapper = styled(Image)`
    cursor: pointer;
`;

const ButtonContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 550px;
`;

const ModalContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

const ModalTitleWrapper = styled("span")`
    font-size: 26px;
    font-weight: 700;

    padding-bottom: 1em;
`;

const ModalContentContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ModalInputContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 670px;
    height: 50px;
`;

const ModalFileInputContainer = styled("div")`
    display: flex;
    justify-content: space-between;
    /* align-items: center; */

    width: 670px;
    height: 180px;

    padding-top: 0.5em;
`;

const InputTitleWrapper = styled("label")`
    font-size: 18px;
    font-weight: 700;

    width: 100px;
`;

const FileInputTitleWrapper = styled("label")`
    font-size: 18px;
    font-weight: 700;

    width: 100px;

    padding-top: 0.4em;
`;

const InputWrapper = styled("div")`
    width: 550px;
`;

const FileInputWrapper = styled("div")`
    width: 550px;
`;

// ----------------------------------------------------------------------------------------------------

/* Add Menu Modal Component */
function AddMenu({
    menuName,
    setMenuName,
    originPrice,
    setOriginPrice,
    uploadedFiles,
    setUploadedFiles,
}: ModalDataType): ReactNode {
    const changeMenuName = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setMenuName(newValue);
    };

    const changeOriginPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d+$/.test(newValue) || newValue === "") {
            setOriginPrice(newValue);
        }
    };

    return (
        <ModalContainer>
            <ModalTitleWrapper>메뉴 추가</ModalTitleWrapper>
            <ModalContentContainer>
                <ModalInputContainer>
                    <InputTitleWrapper htmlFor="menuName">메뉴 이름</InputTitleWrapper>
                    <InputWrapper>
                        <TextInput
                            value={menuName}
                            width="543px"
                            id="menuName"
                            onChange={changeMenuName}
                        />
                    </InputWrapper>
                </ModalInputContainer>
                <ModalInputContainer>
                    <InputTitleWrapper htmlFor="originPrice">메뉴 원가</InputTitleWrapper>
                    <InputWrapper>
                        <TextInput
                            value={originPrice}
                            width="543px"
                            id="originPrice"
                            onChange={changeOriginPrice}
                            unit="원"
                        />
                    </InputWrapper>
                </ModalInputContainer>
                <ModalFileInputContainer>
                    <FileInputTitleWrapper htmlFor="menuImage">메뉴 사진</FileInputTitleWrapper>
                    <FileInputWrapper>
                        <FileInput
                            count={5}
                            color="primary"
                            id="menuImage"
                            buttonWidth="150px"
                            buttonHeight="40px"
                            buttonDescription="추가"
                            uploadedFiles={uploadedFiles}
                            setUploadedFiles={setUploadedFiles}
                        />
                    </FileInputWrapper>
                </ModalFileInputContainer>
            </ModalContentContainer>
        </ModalContainer>
    );
}

/* Seller Funding Form Page */
function FundingForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [textFormData, setTextFormData] = useState([
        {
            type: "title",
            text: "펀딩 제목",
            data: "",
            dataType: "string",
            unit: "",
        },
        { type: "maxLimit", text: "최대 참여 인원", data: "", dataType: "number", unit: "명" },
        { type: "minLimit", text: "최소 참여 인원", data: "", dataType: "number", unit: "명" },
    ]);
    const [category, setCategory] = useState({
        type: "category",
        text: "펀딩 분류",
        data: { text: "", value: "" },
    });
    const [endDate, setEndDate] = useState({
        type: "endDate",
        text: "펀딩 종료일",
        data: "",
        dataType: "string",
    });
    const [menuList, setMenuList] = useState<
        {
            menu: string;
            menuId: number;
            price: number;
            businessMenuImageResponseDtos: [];
        }[]
    >([]); // API로 메뉴 목록 받아와야함
    const [menuData, setMenuData] = useState({
        type: "menuRequestDtos",
        text: "메뉴 정보",
        data: { menuId: 0, discountPrice: "", originPrice: "" },
        menu: "",
    });
    const [tags, setTags] = useState<{ type: string; text: string; data: string[] }>({
        type: "tags",
        text: "검색용 태그",
        data: [],
    });
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState({
        type: "description",
        text: "소개 문구",
        data: "",
        dataType: "string",
    });

    const [menuName, setMenuName] = useState("");
    const [originPrice, setOriginPrice] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

    function getToday() {
        const todayDate = new Date();
        const year = todayDate.getFullYear();
        const month = (todayDate.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
        const day = todayDate.getDate().toString().padStart(2, "0"); // 일도 2자리로 포맷팅

        return `${year}-${month}-${day}`;
    }

    const today = getToday();

    const todayValue = new Date();
    const endDateValue = new Date(endDate.data);

    todayValue.setHours(0, 0, 0, 0);
    endDateValue.setHours(0, 0, 0, 0);

    const timeDifference = endDateValue.getTime() - todayValue.getTime();
    const daysDifference = changeFontWeight(
        `오늘부터 ...${timeDifference / (24 * 60 * 60 * 1000)}... 일 뒤 종료 예정`,
    );

    useEffect(() => {
        getMenuList().then((res) => {
            setMenuList(res.data);
            console.log(res);
        });
    }, []);

    const changeFormData = (e: React.ChangeEvent<HTMLInputElement>, form: TextFormDataType) => {
        const newValue = e.target.value;
        if ((form.dataType === "number" && /^\d+$/.test(newValue)) || newValue === "") {
            setTextFormData((prev) => {
                const update = prev.map((one) => {
                    if (one.type === form.type) {
                        return { ...one, data: newValue };
                    }
                    return one;
                });
                return update;
            });
        }
        if (form.dataType === "string") {
            setTextFormData((prev) => {
                const update = prev.map((one) => {
                    if (one.type === form.type) {
                        return { ...one, data: newValue };
                    }
                    return one;
                });
                return update;
            });
        }
    };

    const changeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (newValue > today) {
            setEndDate((prev) => {
                return { ...prev, data: newValue };
            });
        }
    };

    const changeDiscountPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (
            /^\d+$/.test(newValue) ||
            newValue === ""
            // && newValue < originPrice
        ) {
            setMenuData((prev) => {
                return { ...prev, data: { ...prev.data, discountPrice: newValue } };
            });
        }
    };

    const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setDescription((prev) => {
            return { ...prev, data: newValue };
        });
    };

    const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = menuCategory.find((one) => {
            return e.target.value === one.text;
        });
        if (newValue) {
            setCategory((prev) => {
                return { ...prev, data: { text: newValue.text, value: newValue.value } };
            });
        }
    };

    const changeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setTag(newValue);
    };

    const changeMenuData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = menuList.find((menu) => {
            return e.target.value === menu.menu;
        });
        if (newValue) {
            setMenuData((prev) => {
                return {
                    ...prev,
                    data: {
                        menuId: newValue.menuId,
                        discountPrice: newValue.price.toString(),
                        originPrice: newValue.price.toString(),
                    },
                };
            });
        }
    };

    const addTag = () => {
        if (tag.trim() !== "") {
            if (tags.data.length < 5) {
                setTags((prev) => {
                    return { ...prev, data: [...prev.data, tag] };
                });
                setTag("");
            }
        }
    };

    const deleteTag = (one: string) => {
        const newTags = tags.data.filter((onetag) => {
            return onetag !== one;
        });

        setTags((prev) => {
            return { ...prev, data: newTags };
        });
    };

    const submitModalData = () => {
        addNewMenu({
            menu: menuName,
            price: originPrice,
            multipartFiles: uploadedFiles,
        }).then((res) => {
            // 메뉴 추가 임시 로그
            console.log(res);
        });
    };

    const submitFunding = () => {
        createFunding({
            category: category.data.value,
            description: description.data,
            endDate: endDate.data,
            maxLimit: parseFloat(textFormData[1].data),
            minLimit: parseFloat(textFormData[2].data),
            tags: tags.data,
            title: textFormData[0].data,
            menuRequestDtos: {
                // 임시로 1
                menuId: 1,
                // menuId: menuData.data.menuId,
                discountPrice: parseFloat(menuData.data.discountPrice),
            },
        }).then((res) => {
            // 펀딩 생성 임시 로그
            console.log(res);
        });
    };

    return (
        <FundingFormContainer>
            <TitleWrapper>펀딩 생성</TitleWrapper>
            <FormContainer>
                {textFormData.map((form, idx) => (
                    <InputContainer key={`${form.type}-${idx}`}>
                        <InputLabel htmlFor={form.type}>{form.text}</InputLabel>
                        <TextInput
                            id={form.type}
                            value={form.data}
                            onChange={(e) => changeFormData(e, form)}
                            width="500px"
                            unit={form.unit}
                        />
                    </InputContainer>
                ))}
                <InputContainer>
                    <InputLabel htmlFor={endDate.dataType}>{endDate.text}</InputLabel>
                    <MultiInputContainer>
                        <DateInput
                            type="date"
                            id="date-input"
                            value={endDate.data}
                            min={today}
                            required
                            onChange={(e) => changeEndDate(e)}
                        />
                        {endDate.data !== "" && (
                            <RemainDateWrapper
                                dangerouslySetInnerHTML={{ __html: daysDifference }}
                            />
                        )}
                    </MultiInputContainer>
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="menu">펀딩 메뉴</InputLabel>
                    <MultiInputContainer>
                        <DropDownWrapper>
                            <InputDropdown
                                id="menu"
                                value={menuData.menu}
                                width="370px"
                                required
                                itemList={
                                    menuList && menuList.length > 0
                                        ? menuList.map((one) => one.menu)
                                        : ["데이터가 없습니다."]
                                }
                                onChange={(e) => changeMenuData(e)}
                            />
                        </DropDownWrapper>
                        <TextButton
                            text="새 메뉴"
                            width="120px"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </MultiInputContainer>
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="category">펀딩 분류</InputLabel>
                    <CategoryDropDownWrapper>
                        <InputDropdown
                            id="category"
                            value={category.data.text}
                            width="500px"
                            required
                            itemList={menuCategory.map((one) => one.text)}
                            onChange={(e) => changeCategory(e)}
                        />
                    </CategoryDropDownWrapper>
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="originalPrice">메뉴 원가</InputLabel>
                    <TextInput
                        id="originalPrice"
                        value={menuData.data.originPrice}
                        unit="원"
                        readOnly
                        width="500px"
                    />
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="discountPrice">메뉴 할인가</InputLabel>
                    <TextInput
                        id="discountPrice"
                        value={menuData.data.discountPrice.toString()}
                        onChange={(e) => changeDiscountPrice(e)}
                        width="500px"
                        unit="원"
                    />
                </InputContainer>
                <InputContainer>
                    <InputLabel htmlFor="tags">검색용 태그</InputLabel>
                    <MultiInputContainer>
                        <TextInput
                            id="tags"
                            value={tag}
                            onChange={(e) => changeTag(e)}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    addTag();
                                }
                            }}
                            width="370px"
                        />
                        <TextButton text="추가" width="120px" onClick={addTag} />
                    </MultiInputContainer>
                </InputContainer>
                {tags.data.length > 0 && (
                    <InputContainer>
                        <InputLabel> </InputLabel>
                        <TagsContainer>
                            {tags.data.map((one, idx) => (
                                <TagContainer key={`${one}-${idx}`}>
                                    <TagButton
                                        tagDescription={one}
                                        colorType="primary"
                                        width="80px"
                                    />
                                    <DeleteIconWrapper
                                        src="/assets/icons/delete-icon.svg"
                                        alt="delete-tag"
                                        width={15}
                                        height={15}
                                        onClick={() => deleteTag(one)}
                                    />
                                </TagContainer>
                            ))}
                        </TagsContainer>
                    </InputContainer>
                )}

                <TextAreaContainer>
                    <TextAreaLabel htmlFor="description">소개문</TextAreaLabel>
                    <TextArea
                        value={description.data}
                        onChange={(e) => changeDescription(e)}
                        width="500px"
                        height="120px"
                        maxLength={200}
                        id="description"
                        name="description"
                        focusColor="primary"
                    />
                </TextAreaContainer>
            </FormContainer>
            <ButtonContainer>
                <TextButton
                    text="펀딩 생성"
                    width="250px"
                    height="50px"
                    fontSize={24}
                    onClick={submitFunding}
                />
                <TextButton text="취소" fill="negative" width="250px" height="50px" fontSize={24} />
            </ButtonContainer>
            <Modal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                width="800px"
                height="500px"
                buttonType="submit"
                buttonWidth="200px"
                buttonHeight="50px"
                buttonFontSize={20}
                childComponent={AddMenu({
                    menuName,
                    setMenuName,
                    originPrice,
                    setOriginPrice,
                    uploadedFiles,
                    setUploadedFiles,
                })}
                onSubmit={submitModalData}
            />
        </FundingFormContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Middleware */
const FundingFormWithAuth = withAuth({
    WrappedComponent: FundingForm,
    // guardType: "USER_ONLY",
});

// ----------------------------------------------------------------------------------------------------

/* Layout */
FundingFormWithAuth.getLayout = function getLayout(page: ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FundingFormWithAuth;
