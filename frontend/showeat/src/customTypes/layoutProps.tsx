/* Import */
import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactNode } from "react";

// ----------------------------------------------------------------------------------------------------

/* Export */
export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactNode) => ReactNode;
};

export interface AppPropsWithLayout extends AppProps {
    Component: NextPageWithLayout;
}

export interface LayoutProps {
    children: ReactNode;
}
