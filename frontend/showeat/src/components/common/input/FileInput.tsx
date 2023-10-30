/* Import */
import { ButtonProps } from "@customTypes/commonProps";
import { changeFontWeight } from "@utils/format";
import Image from "next/image";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useRef, useState } from "react";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface FileInputProps {
    count: 1 | 2 | 3 | 4 | 5;
    color: "primary" | "secondary" | "gray" | "white";
    id: string;
    buttonWidth: string;
    buttonHeight: string;
    buttonFontSize?: string;
    buttonFontWeight?: string;
    buttonDescription: string;
    listWidth?: string;
    listHeight?: string;
}

interface FileInputButtonWrapperTypes extends ButtonProps {
    fontSize: string;
    fontWeight: string;
    color: "primary" | "secondary" | "gray" | "white";
}

interface FilesListContainerTypes {
    listWidth: string;
    listHeight?: string;
    addIcon: boolean;
    color: "primary" | "secondary" | "gray" | "white";
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const clickAnimation = keyframes`
from {
  transform: scale(1)
}
to {
  transform: scale(1.04)
}
`;

const FileInputContainer = styled("div")`
    //
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

const FileInputButtonWrapper = styled("button")<FileInputButtonWrapperTypes>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    font-size: ${(props) => props.fontSize};
    font-weight: ${(props) => props.fontWeight};
    color: ${(props) => {
        if (props.color === "secondary" || props.color === "primary") {
            return "white";
        }
        return "black";
    }};

    background-color: ${(props) => {
        if (props.color !== "white") {
            return props.theme.colors[`${props.color}3`];
        }
        return "white";
    }};

    border: ${(props) => (props.color === "white" ? "1px solid black" : "none")};
    border-radius: 10px;
    margin-right: 10px;

    cursor: pointer;

    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:hover {
        background-color: ${(props) => {
            if (props.color !== "white") {
                return props.theme.colors[`${props.color}4`];
            }
            return "#d7d7d7";
        }};
        box-shadow: 0px 0px 5px 2px ${(props) => props.theme.colors.gray3};

        color: ${(props) => {
            if (props.color === "white") {
                return "black";
            }
            return "white";
        }};
        cursor: pointer;
    }

    &:active {
        background-color: ${(props) => {
            if (props.color !== "white") {
                return props.theme.colors[`${props.color}5`];
            }

            return "#a7a7a7";
        }};
        box-shadow: 0px 0px 5px 2px ${(props) => props.theme.colors.gray4};

        color: ${(props) => {
            if (props.color === "white") {
                return "black";
            }
            return "white";
        }};

        cursor: pointer;
        animation: ${clickAnimation} 0.1s linear forwards;
    }
`;

const FilesListContainer = styled("div")<FilesListContainerTypes>`
    width: ${(props) => props.listWidth};
    height: ${(props) => props.listHeight};

    display: flex;
    justify-content: ${(props) => (props.addIcon ? "center" : "space-between")};
    align-items: center;

    margin: 10px 0px;
    padding: 10px 20px;

    border: 1px solid #c7c7c7;
    border-radius: 20px;

    box-shadow: 0px 0px 5px 1px ${(props) => props.theme.colors.gray2};

    &.dragging-over {
        box-shadow: 0px 0px 8px 2px ${(props) => props.theme.colors[`${props.color}2`]};
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
    buttonFontSize = "20px",
    buttonFontWeight = "Regular",
    buttonDescription,
    listWidth = `${count * 100}px`,
    listHeight = "80px",
}: FileInputProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
                <FileInputButtonWrapper
                    width={buttonWidth}
                    height={buttonHeight}
                    fontSize={buttonFontSize}
                    fontWeight={buttonFontWeight}
                    onClick={handleInputButton}
                    color={color}
                >
                    {buttonDescription}
                </FileInputButtonWrapper>
                {count === 1 && uploadedFiles.length === 1 && (
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
                )}
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
                >
                    {uploadedFiles.length === 0 && (
                        <AddIconWrapper
                            src="/assets/icons/round_add_icon.svg"
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
