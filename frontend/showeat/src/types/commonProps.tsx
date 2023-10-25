/* Import */
import React from "react";

// ----------------------------------------------------------------------------------------------------

/* Export */
export interface ButtonProps {
    width: string;
    height?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
