import { INavItem } from '../interfaces/INavItem.ts';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import {ROUTES} from "./routes.ts";

export const navItems: INavItem[] = [
    { title: "Лента", path: ROUTES.HOME, icon: <NewspaperRoundedIcon/> },
    { title: "Адресная книга", path: ROUTES.CONTACTS, icon: <PeopleAltRoundedIcon/> },
];