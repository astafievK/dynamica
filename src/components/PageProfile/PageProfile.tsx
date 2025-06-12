import { FC, useEffect, useState } from "react";
import { pageAnimation } from "../../constants/motionSettings.ts";
import { motion } from "framer-motion";
import { setIsOpen as setLoginModalOpen } from "../../api/slices/modalLoginSlice.ts";
import { useAppDispatch, useTypedSelector } from "../../store/hooks/redux.ts";
import {useNavigate} from "react-router-dom";
import { FilterButtons } from "../FilterButtons/FilterButtons.tsx";
import {useGetUsersCoursesQuery} from "../../api/methods/moodle/courseMoodleApi.ts";

const filtersDocumentsTypes = [
    "Последние",
    "Активно",
    "Завершено",
    "Прервано",
    "Отменено"
];

export const PageProfile: FC = () => {
    const {user} = useTypedSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [documentsType, setDocumentsType] = useState<string>("")
    const {data: coursesData} = useGetUsersCoursesQuery(
        {
            token: import.meta.env.VITE_MOODLE_API_TOKEN,
            idUser: user?.moodleUserId ?? undefined
        },
        {
            skip: !user?.moodleUserId,  // Пропускаем запрос, если moodleUserId нет
        }
    );

    console.log(coursesData)

    useEffect(() => {
        if (!user) {
            navigate("/");
            dispatch(setLoginModalOpen(true));
        }
    }, [user, dispatch, navigate]);

    if (!user) return null;

    return (
        <motion.div {...pageAnimation} className={"page page-profile"}>
            <div className="page-header">
                <span className="page-title page-title__name">{user.name} {user.surname}</span>
                <span className="page-title__district">{user.department.division.title} • {user.position.title}</span>
            </div>
            <div className="page-content">
                <div className="widgets">
                    <div className="widgets-head">
                        <div className="widget widget-documents">
                            <div className="widget-header">
                                <span className="widget-title">Договора</span>
                            </div>
                            <div className="widget-filters">
                                <FilterButtons
                                    filter={documentsType}
                                    setFilter={setDocumentsType}
                                    data={filtersDocumentsTypes}
                                    renderLabel={(item) => item}
                                />
                            </div>
                            <div className="widget-body">
                                <div className="widget-item document">
                                    <span className="widget-item-title">Заголовок документа</span>
                                    <div className="widget-item-status status-success">Согласовано</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
