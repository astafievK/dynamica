import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import { INavItem } from '../interfaces/INavItem.ts';

export const navItems: INavItem[] = [
    { title: "Лента", path: "/", icon: <NewspaperOutlinedIcon/> },
    { title: "Адресная книга", path: "/contacts", icon: <ContactsOutlinedIcon/> },
];