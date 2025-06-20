import {FC, useEffect, useState} from "react";
import { useAppDispatch, useTypedSelector } from "../../../store/hooks/redux.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginCommand } from "../../../api/commands/ILoginCommand.ts";
import { useLoginMutation } from "../../../api/methods/authApi.ts";
import { Cross } from "../../Cross/Cross.tsx";
import {ModalUserNotification} from "../ModalUserNotification/ModalUserNotification.tsx";
import { setIsOpen } from "../../../api/slices/modalLoginSlice.ts";

export const ModalLogin: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useTypedSelector((state) => state.modalLoginReducer.modalLoginIsOpen);
    const [isClosing, setIsClosing] = useState(false);
    const { handleSubmit, register } = useForm<ILoginCommand>();
    const [login, { isLoading }] = useLoginMutation();
    const [notification, setNotification] = useState<{ title?: string; message: string } | null>(null);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            dispatch(setIsOpen(false));
            setIsClosing(false);
        }, 400);
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                handleClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    if (!isOpen && !isClosing) return null;

    const onSubmit: SubmitHandler<ILoginCommand> = async (data) => {
        try {
            const response = await login(data).unwrap();

            if (response.status === 'failed') {
                console.error(response.message);
                setNotification({
                    title: "Авторизация",
                    message: response.message || "Неизвестная ошибка",
                });
            } else if (response.user) {
                handleClose();
            }
        } catch (err: any) {
            console.error(err);
            setNotification({
                title: "Ошибка подключения",
                message:
                    err?.status === 'FETCH_ERROR'
                        ? "Сервер недоступен. Повторите попытку позже."
                        : err?.data?.message || "Неизвестная ошибка",
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

            <dialog className={`modal ${isClosing ? "hidden" : ""}`} open={isOpen}>
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
                                className={"styled"}
                                placeholder={"name.surname"}
                                {...register("username")}
                                autoComplete="new-password"
                                required
                            />
                        </div>
                        <div className="form-element form-elem__text">
                            <label htmlFor="loginPassword">Пароль</label>
                            <input
                                id="loginPassword"
                                className={"styled"}
                                type="password"
                                placeholder={"••••••"}
                                {...register("password")}
                                autoComplete="new-password"
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
