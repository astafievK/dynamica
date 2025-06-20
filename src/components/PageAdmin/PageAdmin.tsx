import {Outlet} from "react-router-dom";
import {FC} from "react";

export const PageAdmin: FC = () => {
    return (
        <>
            <div className="page page-admin">
                <div className="page-header">
                    <span className="page-title page-title__name">Администрирование</span>
                </div>
                <div className="page-admin__content">
                    <Outlet />
                </div>
            </div>
        </>
    );
};
