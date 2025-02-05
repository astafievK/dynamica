import {FC} from "react";
import {NavLink} from "react-router-dom";

export const BottomMenu: FC = () => {
    return(
        <div className={"bottom-menu"}>
            <nav className="nav nav-bottom">
                <NavLink
                    to="/bottom-1"
                    className={({ isActive }) =>
                        isActive ? 'nav-item active' : 'nav-item'
                    }
                >
                    Меню 1
                </NavLink>
                <NavLink
                    to="/bottom-2"
                    className={({ isActive }) =>
                        isActive ? 'nav-item active' : 'nav-item'
                    }
                >
                    Меню 2
                </NavLink>
                <NavLink
                    to="/bottom-3"
                    className={({ isActive }) =>
                        isActive ? 'nav-item active' : 'nav-item'
                    }
                >
                    Меню 3
                </NavLink>
            </nav>
        </div>
    )
}