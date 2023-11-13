/* Import */
import { changeFontWeight } from "@utils/format";
import Image from "next/image";
import styled from "@emotion/styled";
import { SetStateAction, useRef } from "react";
import { modifyBusinessInfo } from "@apis/business";
import { TextButton } from "../button";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface FileInputProps {
    count: 1 | 2 | 3 | 4 | 5;
    color: "primary" | "secondary" | "gray" | "white";
    id: string;
    buttonWidth: string;
    buttonHeight: string;
    buttonFontSize?: number;
    buttonDescription: string;
    listWidth?: string;
    listHeight?: string;
    uploadedFiles: File[];
    setUploadedFiles: React.Dispatch<SetStateAction<File[]>>;
    modifyProfile?: boolean;
}

interface FilesListContainerTypes {
    listWidth: string;
    listHeight?: string;
    addIcon: boolean;
    color: "primary" | "secondary" | "gray" | "white";
}

// ----------------------------------------------------------------------------------------------------

/* Style */

const FileInputContainer = styled("div")`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const FileInputButtonContainer = styled("div")`
    display: flex;
    align-items: center;
`;

const FileInputWrapper = styled("input")`
    display: none;
`;

const FileInputCountTextWrapper = styled("span")`
    margin-left: 10px;
    font-size: 14px;
`;

const FilesListContainer = styled("div")<FilesListContainerTypes & { length: number }>`
    width: ${(props) => props.listWidth};
    height: ${(props) => props.listHeight};

    display: ${(props) => (props.length > 0 ? "grid" : "flex")};
    grid-template-columns: ${(props) => props.length > 0 && "repeat(5, 1fr)"};
    gap: ${(props) => props.length > 0 && "5px"};
    justify-content: ${(props) => props.length === 0 && "center"};
    align-items: ${(props) => props.length === 0 && "center"};

    margin: 10px 0px;
    padding: 10px 20px;

    box-sizing: content-box;

    border: 2px solid ${(props) => props.theme.colors.gray3};
    border-radius: 15px;
    &:focus-within {
        border-color: transparent;
        box-shadow:
            0 0 5px 2px ${(props) => props.theme.colors.primary2},
            0 0 0 2px ${(props) => props.theme.colors.primary3};
    }

    &.dragging-over {
        border-color: transparent;
        box-shadow:
            0 0 5px 2px ${(props) => props.theme.colors.primary2},
            0 0 0 2px ${(props) => props.theme.colors.primary3};
    }
`;

const FileImageContainer = styled("div")`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FileImageWrapper = styled(Image)`
    border: 1px solid #c7c7c7;
    border-radius: 10px;
    cursor: grab;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
        transform: scale(1.1);
        filter: drop-shadow(0 0 5px ${(props) => props.theme.colors.gray3});
    }

    &:active {
        cursor: grabbing;
    }
`;

const DeleteIconWrapper = styled(Image)`
    align-self: flex-end;
    cursor: pointer;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
        transform: scale(1.1);
        filter: drop-shadow(0 0 5px ${(props) => props.theme.colors.gray3});
    }
`;

const AddIconWrapper = styled(Image)`
    cursor: pointer;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
        transform: scale(1.1);
        filter: drop-shadow(0 0 5px ${(props) => props.theme.colors.gray3});
    }
`;

// ----------------------------------------------------------------------------------------------------

/* File Input Component */
function FileInput({
    count,
    id,
    color = "white",
    buttonWidth,
    buttonHeight,
    buttonFontSize = 18,
    buttonDescription,
    listWidth = `${count * 100}px`,
    listHeight = "80px",
    uploadedFiles,
    setUploadedFiles,
    modifyProfile = false,
}: FileInputProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleInputButton = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        if (files) {
            const fileList = Array.from(files);

            if (fileList.length + uploadedFiles.length <= count) {
                setUploadedFiles([...uploadedFiles, ...fileList]);
                if (modifyProfile) {
                    modifyBusinessInfo(uploadedFiles).then(() => {
                        setUploadedFiles([]);
                    });
                }
            } else {
                // 다른거로 표시해줘야 할 듯
                console.log(`이미지는 ${count}개까지만 올릴 수 있습니다.`);
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.currentTarget.classList.add("dragging-over");
    };

    function handleDragLeave(e: React.DragEvent) {
        e.currentTarget.classList.remove("dragging-over");
    }

    function handleDragEnd(e: React.DragEvent) {
        e.currentTarget.classList.remove("dragging-over");
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const fileList = e.dataTransfer.files;

        if (fileList.length + uploadedFiles.length <= count) {
            setUploadedFiles([...uploadedFiles, ...Array.from(fileList)]);
        } else {
            // 다른거로 표시해줘야 할 듯
            console.log(`이미지는 ${count}개까지만 올릴 수 있습니다.`);
        }
        e.currentTarget.classList.remove("dragging-over");
    };

    const handleDeleteIcon = (fileIndex: number) => {
        const updatedFiles = uploadedFiles.filter((file, index) => index !== fileIndex);

        setUploadedFiles(updatedFiles);
    };

    const handleAddIcon = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const countText = changeFontWeight(`...${count}개...까지 업로드 가능합니다.`);

    return (
        <FileInputContainer>
            <FileInputButtonContainer>
                <TextButton
                    width={buttonWidth}
                    height={buttonHeight}
                    fontSize={buttonFontSize}
                    onClick={handleInputButton}
                    colorType="primary"
                    text={buttonDescription}
                />
                {/* {count === 1 && uploadedFiles.length === 1 && (
                    <FileImageContainer>
                        <FileImageWrapper
                            src={URL.createObjectURL(uploadedFiles[0])}
                            alt="uploaded-image"
                            width="60"
                            height="60"
                            draggable={false}
                        />
                        <DeleteIconWrapper
                            src="/assets/icons/delete-icon.svg"
                            alt="uploaded-image-delete-icon"
                            width={20}
                            height={20}
                            onClick={() => handleDeleteIcon(0)}
                        />
                    </FileImageContainer>
                )} */}
                <FileInputCountTextWrapper dangerouslySetInnerHTML={{ __html: countText }} />
                <FileInputWrapper
                    ref={inputRef}
                    id={id}
                    name={id}
                    type="file"
                    accept="image/*"
                    multiple={count !== 1}
                    onChange={(e) => handleUploadFiles(e)}
                />
            </FileInputButtonContainer>
            {count !== 1 && (
                <FilesListContainer
                    listWidth={listWidth}
                    listHeight={listHeight}
                    onDragOver={(e) => handleDragOver(e)}
                    onDragLeave={(e) => handleDragLeave(e)}
                    onDragEnd={(e) => handleDragEnd(e)}
                    onDrop={(e) => handleDrop(e)}
                    addIcon={uploadedFiles.length === 0}
                    color={color}
                    length={uploadedFiles.length}
                >
                    {uploadedFiles.length === 0 && (
                        <AddIconWrapper
                            src="/assets/icons/round-add-icon.svg"
                            alt="add-icon"
                            width={40}
                            height={40}
                            onClick={handleAddIcon}
                        />
                    )}
                    {uploadedFiles.map((file, fileIndex) => (
                        <FileImageContainer key={`file-input-${file.name}-${fileIndex + 1}`}>
                            <FileImageWrapper
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                width="60"
                                height="60"
                            />
                            <DeleteIconWrapper
                                src="/assets/icons/delete-icon.svg"
                                alt={`${file.name}-delete-icon`}
                                width={20}
                                height={20}
                                onClick={() => handleDeleteIcon(fileIndex)}
                            />
                        </FileImageContainer>
                    ))}
                </FilesListContainer>
            )}
        </FileInputContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default FileInput;
