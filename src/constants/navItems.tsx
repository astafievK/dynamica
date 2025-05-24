import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import { NavItem } from '../interfaces/NavItem';

export const navItems: NavItem[] = [
    { title: "Главная", path: "/", icon: <HomeOutlinedIcon/>, isIgnore: true },
    { title: "Лента", path: "/feed", icon: <NewspaperOutlinedIcon/> },
    { title: "Адресная книга", path: "/contacts", icon: <ContactsOutlinedIcon/> },
];