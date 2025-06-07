import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import { INavItem } from '../interfaces/INavItem.ts';

export const navItems: INavItem[] = [
    { title: "Главная", path: "/", icon: <HomeOutlinedIcon/>, isIgnore: true },
    { title: "Лента", path: "/feed", icon: <NewspaperOutlinedIcon/> },
    { title: "Адресная книга", path: "/contacts", icon: <ContactsOutlinedIcon/> },
];