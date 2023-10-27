/* Import */
import React from "react";

// ----------------------------------------------------------------------------------------------------

/* Export */
export interface ButtonProps {
    width: string;
    height?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface InputProps {
    width: string;
    height?: string;
    id: string;
    name?: string;
}

export interface TextInputProps {
    width: string;
    id: string;
    setTextValue: React.Dispatch<React.SetStateAction<string>>;
    height?: string;
    placeholder?: string;
    defaultValue?: string;
    labelName?: string;
    svgSRC?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
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
