import { FC, useEffect } from "react";
import { pageAnimation } from "../../constants/motionSettings.ts";
import { motion } from "framer-motion";
import { setIsOpen as setLoginModalOpen } from "../../api/slices/modalLoginSlice.ts";
import { useAppDispatch, useTypedSelector } from "../../store/hooks/redux.ts";
import {useNavigate} from "react-router-dom";
import {WidgetTests} from "./WidgetTests/WidgetTests.tsx";

export const PageProfile: FC = () => {
    const {user} = useTypedSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
            dispatch(setLoginModalOpen(true));
        }
    }, [user, dispatch, navigate]);

    if (!user) return null;

    return (
        <motion.div {...pageAnimation} className={"page page-profile"}>
            {
                /*
                <div className="page-header">
                <span className="page-title page-title__name">{user.name} {user.surname}</span>
                <span className="page-title__district">{user.department.division.title} • {user.position.title}</span>
            </div>
                 */
            }
            <div className="page-content">
                <div className="modules">
                    <WidgetTests/>
                </div>
            </div>
        </motion.div>
    );
}
