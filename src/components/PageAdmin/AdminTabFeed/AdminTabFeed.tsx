import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreatePostMutation } from "../../../api/methods/postApi.ts";
import { CreatePostCommand } from "../../../api/commands/ICreatePostCommand.ts";
import { ModalUserNotification } from "../../Modals/ModalUserNotification/ModalUserNotification.tsx";
import { TextEditor } from "../../TextEditor/TextEditor.tsx";

export const AdminTabFeed: FC = () => {
    const { handleSubmit, register, setValue, reset } = useForm<CreatePostCommand>();
    const [textEditorContent, setTextEditorContent] = useState('');
    const [createPost, { isLoading }] = useCreatePostMutation();
    const [notification, setNotification] = useState<{ title?: string; message: string } | null>(null);

    useEffect(() => {
        setValue("description", textEditorContent);
    }, [textEditorContent, setValue]);

    const onSubmit: SubmitHandler<CreatePostCommand> = async (data) => {
        data.user_id = 2936;
        data.isPinned = false;
        console.log(data)
        try {
            const response = await createPost(data).unwrap();
            if(response.status !== 'failed') {
                reset();
                setTextEditorContent('');
            }
            setNotification({ title: "Создание новости", message: response.message });
        } catch (error) {
            console.log(error)
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

                    <TextEditor value={textEditorContent} onChange={setTextEditorContent} />
                    <textarea {...register("description")} hidden/>

                    <div className="content-tab__actions">
                        <button className="action-file" disabled={true}>Прикрепить файл</button>
                        <button type="submit" className="action-save">
                            Опубликовать
                            {isLoading && <span className="shimmer"></span>}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
