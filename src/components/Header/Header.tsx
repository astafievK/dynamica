import {FC, useEffect, useRef} from "react";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux";
import {NavLink, } from "react-router-dom";
import "./Header.css"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Button from "../CustomDefaultComponents/Button/Button.tsx";
import {setIsOpen} from "../../api/slices/mobileMenuSlice.ts";

export const Header: FC = () => {
    const { mobileMenuIsOpen } = useTypedSelector((state) => state.mobileMenuReducer);
    const dispatch = useAppDispatch();

    const menuRef = useRef<HTMLDivElement | null>(null);

    const closeMenu = () => dispatch(setIsOpen(false));

    // Закрытие по клику вне
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                closeMenu();
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeMenu();
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    });

    return (
        <header>
            <NavLink to="/" id="logo">
                <img src="/logo-horizontal-black.svg" alt="динамика"/>
            </NavLink>
            <Button
                variant={"secondary"}
                id={"burger"}
                onClick={() => dispatch(setIsOpen(!mobileMenuIsOpen))}
            >
                <MenuRoundedIcon/>
            </Button>
        </header>
    );
}
