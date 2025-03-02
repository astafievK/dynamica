import {FC, useState} from "react";
import { useAppDispatch, useTypedSelector } from "../../../store/hooks/redux.ts";
import { setIsOpen } from "../../../api/slices/modalLoginSlice.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginCommand } from "../../../api/commands/ILoginCommand.ts";
import { useLoginMutation } from "../../../api/methods/authApi.ts";
import { useModal } from "../../../store/hooks/useModal.ts";
import { Cross } from "../../Cross/Cross.tsx";
import {ModalUserNotification} from "../ModalUserNotification/ModalUserNotification.tsx";

export const ModalLogin: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useTypedSelector((state) => state.modalLoginReducer.modalLoginIsOpen);
    const { handleSubmit, register } = useForm<ILoginCommand>();
    const [login, { isLoading }] = useLoginMutation();
    const [notification, setNotification] = useState<{ title?: string; message: string } | null>(null);

    const { isClosing, handleClose } = useModal(isOpen, (isOpen) => dispatch(setIsOpen(isOpen)));

    const onSubmit: SubmitHandler<ILoginCommand> = async (data) => {
        try {
            const response = await login(data);
            if (response.data?.status === 'error') {
                setNotification({
                    title: "Авторизация",
                    message: response.data.message || "Неизвестная ошибка",
                });
            } else if (response.data?.user) {
                handleClose();
            }
        } catch (error) {
            setNotification({
                title: "Авторизация",
                message: "Неизвестная ошибка",
            });
        }
    };

    if (!isOpen && !isClosing) return null;

    return (
        <>
            {notification && (
                <ModalUserNotification
                    title={notification.title}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}

            <dialog className="modal" open={isOpen}>
                <div className={`modal-content modal-login ${isClosing ? "hidden" : ""}`}>
                    <div className="modal-content__header">
                        <span className={"modal-title"}>Вход</span>
                        <Cross onClick={() => handleClose()} color={"#000000"} />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-element form-elem__text">
                            <label htmlFor="loginUsername">Логин</label>
                            <input
                                id="loginUsername"
                                type="text"
                                placeholder={"name.surname"}
                                {...register("username")}
                                required
                            />
                        </div>
                        <div className="form-element form-elem__text">
                            <label htmlFor="loginPassword">Пароль</label>
                            <input
                                id="loginPassword"
                                type="password"
                                placeholder={"••••••"}
                                {...register("password")}
                                required
                            />
                        </div>
                        <button type="submit" className={"form-elem__submit"} disabled={isLoading} aria-busy={isLoading}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                                <path
                                    d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z"
                                    data-name="Right"
                                />
                            </svg>
                            {isLoading && <span className="shimmer"></span>}
                        </button>
                    </form>
                </div>
                <div className={`spoiler ${isClosing ? "hidden" : ""}`} onClick={handleClose}></div>
            </dialog>
        </>
    );
};
