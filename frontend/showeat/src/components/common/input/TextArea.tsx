/* Import */
import styled from "@emotion/styled";
import { InputProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TextareaProps extends InputProps {
    maxLength: number;
    value: string;
    textareaName?: string;
    focusColor?: "primary" | "secondary" | "gray";
    fontSize?: string;
    labelFontSize?: string;
    error?: boolean;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
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

    padding: 0.5em 1em;

    box-sizing: border-box;

    border: 2px solid ${(props) => props.theme.colors.gray3};
    border-radius: 15px;
    &:focus-within {
        border-color: transparent;
        box-shadow:
            0 0 5px 2px ${(props) => props.theme.colors.primary2},
            0 0 0 2px ${(props) => props.theme.colors.primary3};
    }
`;

const TextareaBox = styled("textarea")<TextareaBoxType>`
    width: 100%;
    height: 100%;

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
    margin-bottom: 5px;
`;

// ----------------------------------------------------------------------------------------------------

/* Textarea Button Component */
function Textarea({
    width,
    height = "80px",
    maxLength,
    id,
    textareaName,
    value,
    onChange,
    focusColor = "primary",
    fontSize,
    labelFontSize = "20px",
    error = false,
}: TextareaProps) {
    return (
        <TextareaContainer>
            {textareaName && (
                <TextareaLabelWrapper labelFontSize={labelFontSize}>
                    {textareaName}
                </TextareaLabelWrapper>
            )}

            <TextareaWrapper width={width} height={height} focusColor={focusColor} error={error}>
                <TextareaBox
                    id={id}
                    name={id}
                    width={width}
                    height={height}
                    maxLength={maxLength}
                    value={value}
                    onChange={(e) => onChange(e)}
                    fontSize={fontSize}
                />
            </TextareaWrapper>
        </TextareaContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Textarea;
