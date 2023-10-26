/* Import */
import React from "react";

// ----------------------------------------------------------------------------------------------------

/* Export */
export interface ButtonProps {
    width: string;
    height?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
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
