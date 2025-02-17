import { ModalLogin } from "./ModalLogin/ModalLogin";
import { ModalNotifications } from "./ModalNotifications/ModalNotifications";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { useTypedSelector } from "../../store/hooks/redux";
import {FC} from "react";

export const Modals: FC = () => {
    const { modalLoginIsOpen } = useTypedSelector(state => state.modalLoginReducer);
    const { modalNotificationsIsOpen } = useTypedSelector(state => state.modalNotificationsReducer);
    const { mobileMenuIsOpen } = useTypedSelector(state => state.mobileMenuReducer);

    return (
        <>
            <ModalLogin />
            {mobileMenuIsOpen && <MobileMenu />}
            {modalNotificationsIsOpen && <ModalNotifications />}
            {
                // <AnimatePresence>
                //     <ModalLoading />
                // </AnimatePresence>
            }
        </>
    );
};