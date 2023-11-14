/* Import */
import { MouseEvent, ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Export */
export interface ButtonProps {
    width: string;
    height?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
}

export interface DropdownProps {
    width: string;
    height?: string;
    itemList: string[];
}

export interface InputProps {
    width: string;
    height?: string;
    maxHeight?: string;
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
    contentAlign?: "left" | "center" | "right";
    gap?: string;
}

export interface TextBoxProps {
    text: string;
    colorType?: "primary" | "secondary" | "gray";
    fontSize?: number;
}

export interface RadioButtonProps {
    width: string;
    id: string;
    name: string;
    value: string;
    radioName: string;
    height?: string;
    iconURL?: string;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    defaultCheck?: boolean;
}
