import { FC } from "react";
import {useAppDispatch, useTypedSelector} from "../../store/hooks/redux.ts";
import { setIsOpen } from "../../api/slices/modalLoginSlice.ts";
import { SubmitHandler, useForm } from 'react-hook-form';
import {ILoginCommand} from "../../api/interfaces/ILoginCommand.ts";
import {useLoginMutation} from "../../api/methods/authApi.ts";
import {useModal} from "../../store/hooks/useModal.ts";

export const ModalLogin: FC = () => {
    const dispatch = useAppDispatch();
    const isOpen = useTypedSelector((state) => state.modalLoginReducer.modalLoginIsOpen);
    const {handleSubmit, register} = useForm<ILoginCommand>()
    const [login, {isLoading: isLoading}] = useLoginMutation()

    const { isClosing, handleClose } = useModal(isOpen, (isOpen) => dispatch(setIsOpen(isOpen)));

    const onSubmit: SubmitHandler<ILoginCommand> = async (data) => {
        const response = await login(data)
        if (response.data) {
            if (response.data.user.username) {
                handleClose()
            }
        }
    }

    if (!isOpen && !isClosing) return null;

    return (
        <>
            <div className={`modal ${isClosing ? "hidden" : ""}`}>
                <div className={`modal-content modal-login ${isClosing ? "hidden" : ""}`}>
                    <h1>Авторизация</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-element">
                            <input type="text" placeholder="Логин" {...register("username")} required={true}/>
                        </div>
                        <div className="form-element">
                            <input type="password" placeholder="Пароль" {...register("password")} required={true}/>
                        </div>
                        <div className="form-element">
                            <button type="submit" id="authButton" disabled={isLoading}>
                                Вход
                                {
                                    isLoading && <span className="shimmer"></span>
                                }
                            </button>
                        </div>
                    </form>
                </div>
                <div className={`spoiler ${isClosing ? "hidden" : ""}`} onClick={handleClose}></div>
            </div>
        </>
    );
};