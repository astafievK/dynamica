import { ReactElement } from "react";

export interface NavItem {
    title: string;
    path: string;
    icon: ReactElement;
    isIgnore?: boolean;
}