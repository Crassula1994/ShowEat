/* Import */
import { Dispatch, MouseEvent, ReactNode, SetStateAction } from "react";

// ----------------------------------------------------------------------------------------------------

/* Export */
export interface ButtonProps {
    width: string;
    height?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export interface InputProps {
    width: string;
    height?: string;
    id: string;
    name?: string;
}

export interface OverlayProps {
    zIndex: number;
    children: ReactNode;
}

export interface TableProps {
    headerWidth?: string;
    headers: string[];
    contents: (string | number)[];
}

export interface TextBoxProps {
    text: string;
    colorType?: "primary" | "secondary" | "gray";
    fontSize?: number;
}

export interface TextInputProps {
    width: string;
    id: string;
    setTextValue: Dispatch<SetStateAction<string>>;
    height?: string;
    placeholder?: string;
    defaultValue?: string;
    labelName?: string;
    svgSRC?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export interface RadioButtonProps {
    width: string;
    id: string;
    name: string;
    value: string;
    radioName: string;
    height?: string;
    iconURL?: string;
}
