/* Import */
import styled from "@emotion/styled";
import Image from "next/image";
import { RadioButtonProps } from "@customTypes/commonProps";

// ----------------------------------------------------------------------------------------------------

/* Style */
const RadioButtonContainer = styled("div")<{ width: string; height: string | undefined }>`
    display: inline-flex;
    justify-content: space-between;
    align-items: center;

    width: ${(props) => props.width};
    height: ${(props) => (props.height ? props.height : "auto")};

    white-space: nowrap;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;
const RadioButtonWrapper = styled("input")`
    position: relative;

    width: 16px;
    height: 16px;

    border-radius: 50%;
    border: 2px solid ${(props) => props.theme.colors.gray3};
    margin: 0px;
    margin-right: 10px;

    appearance: none;
    transition: 0.15s all linear;

    &:checked {
        transform: scale(1.2);
        border: 5px solid ${(props) => props.theme.colors.primary3};
        box-shadow: 0px 0px 5px 2px ${(props) => props.theme.colors.gray2};
    }
`;

const RadioButtonLabelContainer = styled("div")`
    display: inline-flex;
    justify-content: center;
    align-items: center;
`;
const RadioButtonLabelWrapper = styled("label")`
    font-size: 17px;
    text-align: end;
`;

const RadioButtonIconWrapper = styled(Image)`
    margin-left: 5px;
`;

// ----------------------------------------------------------------------------------------------------

/* Radio Button Component */
function RadioButton({
    width,
    height,
    id,
    name,
    value,
    radioName,
    iconURL,
    onClick,
    defaultCheck = false,
}: RadioButtonProps) {
    return (
        <RadioButtonContainer width={width} height={height}>
            <RadioButtonWrapper
                type="radio"
                id={id}
                name={name}
                value={value}
                onClick={onClick}
                defaultChecked={defaultCheck}
            />
            <RadioButtonLabelContainer>
                <RadioButtonLabelWrapper htmlFor={id}>{radioName}</RadioButtonLabelWrapper>
                {iconURL && (
                    <RadioButtonIconWrapper src={iconURL} alt="Radio Icon" width={16} height={16} />
                )}
            </RadioButtonLabelContainer>
        </RadioButtonContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default RadioButton;
