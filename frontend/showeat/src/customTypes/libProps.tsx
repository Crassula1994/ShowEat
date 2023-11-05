/* Import */
import { ComponentType, FunctionComponent, ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Export */
export type ComponentWithAuth<P> = FunctionComponent<P> & {
    getLayout?: (page: ReactNode) => ReactNode;
};

export interface WithAuthProps<P = Record<string, never>> {
    WrappedComponent: ComponentType<P>;
    guardType?: "PUBLIC" | "USER_ONLY" | "GUEST_ONLY";
    redirectUrl?: string;
}
