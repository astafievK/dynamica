import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks/redux.ts";
import { addHistory } from "../../api/slices/historySlice.ts";

const pageTitles: { [key: string]: string } = {
    "/": "Главная",
    "/feed": "Лента",
    "/editor": "Редактор",
    "/document": "Документ",
    "/document_par": "Документ (параллельный)",
    "/profile": "Профиль",
    "/documents": "Документы",
    "/contacts": "Адресная книга",
    "/admin": "Админ-панель",
    "/admin/feed": "Админ-панель • Лента",
    "/admin/contacts": "Админ-панель • Адресная книга",
    "/admin/documents": "Админ-панель • Документы",
    "/admin/adaptation": "Админ-панель • Адаптация",
    "/not_found": "Страница не найдена"
};

export const HistoryTracker = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (location.pathname !== "/not_found") {
            const title = pageTitles[location.pathname] || "Неизвестная страница";
            dispatch(addHistory({ path: location.pathname, title }));
        }
    }, [location, dispatch]);

    return null;
};
