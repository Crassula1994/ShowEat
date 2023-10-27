/* Import */
import styled from "@emotion/styled";
import { TextInputProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface TextareaProps extends TextInputProps {
    maxLength: number;
    textareaName: string;
    focusColor: "primary" | "secondary" | "gray";
    // eslint-disable-next-line react/require-default-props
    fontSize?: string;
    // eslint-disable-next-line react/require-default-props
    labelFontSize?: string;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const TextareaContainer = styled("div")`
    border: 1px solid ${(props) => props.theme.colors.gray2};
`;

const TextareaWrapper = styled("div")<{
    width: string;
    height: string | undefined;
    focusColor: "primary" | "secondary" | "gray";
}>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    padding: 20px 30px;
    margin-top: 5px;

    border: 1px solid ${(props) => props.theme.colors.gray2};
    border-radius: 20px;

    &:focus-within {
        box-shadow: 0px 0px 4px 2px
            ${(props) =>
                // eslint-disable-next-line no-nested-ternary
                props.focusColor === "primary"
                    ? props.theme.colors.primary2
                    : props.focusColor === "secondary"
                    ? props.theme.colors.secondary2
                    : props.theme.colors.gray2};
        outline: 1px solid
            ${(props) =>
                // eslint-disable-next-line no-nested-ternary
                props.focusColor === "primary"
                    ? props.theme.colors.primary3
                    : props.focusColor === "secondary"
                    ? props.theme.colors.secondary3
                    : props.theme.colors.gray3};
    }
`;

const TextareaBox = styled("textarea")<{
    width: string;
    height: string | undefined;
    fontSize?: string;
}>`
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
`;

// ----------------------------------------------------------------------------------------------------

/* Textarea Button Component */
function Textarea({
    width,
    height,
    maxLength,
    id,
    textareaName,
    setTextValue,
    focusColor,
    fontSize,
    labelFontSize,
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
            <TextareaWrapper width={width} height={height} focusColor={focusColor}>
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
