import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import { INavItem } from '../interfaces/INavItem.ts';
import {ROUTES} from "./routes.ts";

export const navItems: INavItem[] = [
    { title: "Лента", path: ROUTES.HOME, icon: <NewspaperOutlinedIcon/> },
    { title: "Адресная книга", path: ROUTES.CONTACTS, icon: <ContactsOutlinedIcon/> },
];