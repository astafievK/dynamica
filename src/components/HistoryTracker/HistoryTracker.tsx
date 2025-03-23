import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks/redux.ts";
import { addHistory } from "../../api/slices/historySlice.ts";
import { ROUTES, PAGE_TITLES } from "../../constants/routes.ts";

export const HistoryTracker = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (location.pathname !== ROUTES.NOT_FOUND) {
            const title = PAGE_TITLES[location.pathname] || "Неизвестная страница";
            dispatch(addHistory({ path: location.pathname, title }));
        }
    }, [location, dispatch]);

    return null;
};
