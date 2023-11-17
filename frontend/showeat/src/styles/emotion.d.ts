/* Import */
import "@emotion/react";

// ----------------------------------------------------------------------------------------------------

/* Export */
declare module "@emotion/react" {
    export interface Theme {
        colors: Record<string, string>;
    }
}
