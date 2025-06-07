import { ReactElement } from "react";

export interface INavItem {
    title: string;
    path: string;
    icon: ReactElement;
    isIgnore?: boolean;
}