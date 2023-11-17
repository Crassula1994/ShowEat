/* Import */
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FileInput, TextInput } from "@components/common/input";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface AddMenuModalProps {
    menuName: string;
    setMenuName: Dispatch<SetStateAction<string>>;
    originPrice: string;
    setOriginPrice: Dispatch<SetStateAction<string>>;
    uploadedFiles: File[];
    setUploadedFiles: Dispatch<SetStateAction<File[]>>;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
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
function AddMenuModal(props: AddMenuModalProps) {
    // States and Variables
    const { menuName, setMenuName, originPrice, setOriginPrice, uploadedFiles, setUploadedFiles } =
        props;

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

// ----------------------------------------------------------------------------------------------------

/* Export */
export default AddMenuModal;
