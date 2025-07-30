import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreatePostMutation } from "../../../api/methods/postApi.ts";
import { CreatePostCommand } from "../../../api/commands/ICreatePostCommand.ts";
import { ModalUserNotification } from "../../Modals/ModalUserNotification/ModalUserNotification.tsx";
import { TextEditor } from "../../TextEditor/TextEditor.tsx";
import {useTypedSelector} from "../../../store/hooks/redux.ts";
import {Notification} from "../../../types/Notification.ts";
import Button from "../../Buttons/Button/Button.tsx";
import "./AdminFeed.css";

export const AdminFeed: FC = () => {
    const { handleSubmit, register, setValue, reset } = useForm<CreatePostCommand>();
    const [textEditorContent, setTextEditorContent] = useState('');
    const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
    const [notification, setNotification] = useState<Notification | null>(null);
    const { user } = useTypedSelector((state) => state.auth)

    useEffect(() => {
        setValue("description", textEditorContent);
    }, [textEditorContent, setValue]);

    const onSubmit: SubmitHandler<CreatePostCommand> = async (data) => {
        if (!user || isCreating) return null;

        const payload: CreatePostCommand = {
            ...data,
            description: textEditorContent,
            id_user: user.id_user,
            isPinned: false
        };
        try {
            const response = await createPost(payload).unwrap();
            if (response.status !== 'failed') {
                reset();
                setTextEditorContent('');
                setNotification({ message: response.message || "Новость создана" });
            } else {
                console.error(response)
            }
        } catch (error) {
            console.error(error)
            setNotification({ title: "Ошибка", message: "Неизвестная ошибка" });
        }
    };

    return (
        <>
            {notification && (
                <ModalUserNotification
                    title={notification.title}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}

            <div className="content-tab content-tab--feed">
                <span className="content-tab__title">Добавить новость</span>
                <form className="content-tab__form" onSubmit={handleSubmit(onSubmit)}>
                    <input className="content-tab__input content-tab__input--title styled" type="text" placeholder="Заголовок новости" {...register("title")} required/>

                    <TextEditor
                        value={textEditorContent}
                        onChange={setTextEditorContent}
                    />

                    <div className="content-tab__actions">
                        <Button
                            type={"submit"}
                            className={"content-tab__action-submit"}
                            variant={"action"}
                        >
                            Опубликовать
                            {isCreating && <span className="shimmer"></span>}
                        </Button>
                        <Button
                            className={"content-tab__action-clear"}
                            type={"button"}
                        >
                            Очистить
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};
