/* Import */
import styled from "@emotion/styled";
import { TextInputProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TextareaProps extends TextInputProps {
    maxLength: number;
    textareaName: string;
    focusColor: "primary" | "secondary" | "gray";
    fontSize?: string;
}

interface TextareaWrapperType {
    width: string;
    height: string;
    focusColor: "primary" | "secondary" | "gray";
    error: boolean;
}

interface TextareaBoxType {
    width: string;
    height: string;
    fontSize?: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const TextareaContainer = styled("div")`
    /* border: 1px solid ${(props) => props.theme.colors.gray2}; */
`;

const TextareaWrapper = styled("div")<TextareaWrapperType>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    padding: 15px 20px;
    margin-top: 5px;

    box-shadow: ${(props) =>
        props.error
            ? `0px 0px 4px 2px ${props.theme.colors.normalRed}`
            : `0px 0px 4px 2px ${props.theme.colors.gray5}`};
    border-radius: 20px;

    &:focus-within {
        box-shadow: 0px 0px 4px 2px
            ${(props) => {
                let focusColor;
                if (props.focusColor === "primary") {
                    focusColor = props.theme.colors.primary3;
                } else if (props.focusColor === "secondary") {
                    focusColor = props.theme.colors.secondary3;
                } else {
                    focusColor = props.theme.colors.gray3;
                }
                return focusColor;
            }};
    }
`;

const TextareaBox = styled("textarea")<TextareaBoxType>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    border: none;
    background-color: transparent;

    font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};

    resize: none;

    &:focus,
    &:active {
        outline: none;
    }
`;

const TextareaLabelWrapper = styled("label")<{ labelFontSize?: string }>`
    font-size: ${(props) => (props.labelFontSize ? props.labelFontSize : "20px")};
    font-weight: 700;

    margin-left: 0.5em;
`;

// ----------------------------------------------------------------------------------------------------

/* Textarea Button Component */
function Textarea({
    width,
    height = "80px",
    maxLength,
    id,
    textareaName,
    setTextValue,
    focusColor,
    fontSize,
    labelFontSize,
    error = false,
}: TextareaProps) {
    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setTextValue(newValue);
    };

    return (
        <TextareaContainer>
            <TextareaLabelWrapper labelFontSize={labelFontSize}>
                {textareaName}
            </TextareaLabelWrapper>
            <TextareaWrapper width={width} height={height} focusColor={focusColor} error={error}>
                <TextareaBox
                    id={id}
                    name={id}
                    width={width}
                    height={height}
                    maxLength={maxLength}
                    onChange={(e) => handleChangeText(e)}
                    fontSize={fontSize}
                />
            </TextareaWrapper>
        </TextareaContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Textarea;
