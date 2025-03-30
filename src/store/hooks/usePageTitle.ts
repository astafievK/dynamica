import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_TITLES } from "../../constants/routes";

export const usePageTitle = () => {
    const location = useLocation();

    useEffect(() => {
        document.title = PAGE_TITLES[location.pathname] || "Приложение";
    }, [location.pathname]);
};
