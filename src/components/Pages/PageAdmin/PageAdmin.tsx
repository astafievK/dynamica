import {Outlet} from "react-router-dom";
import {FC} from "react";
import "./PageAdmin.css";

export const PageAdmin: FC = () => {
    return (
        <div className="page page-admin">
            <div className="page-content">
                <Outlet />
            </div>
        </div>
    );
};
