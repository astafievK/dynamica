import {FC} from "react";

export const AdminTabFeed: FC = () => {
    return (
        <div className="content-tab content-tab--feed">
            <span className="content-tab__title">Добавить новость</span>
            <form className="content-tab__form">
                <input className="content-tab__input content-tab__input--title styled" type="text" placeholder="Заголовок новости"/>
                <textarea className="content-tab__input content-tab__input--content styled" placeholder="Содержание"/>
                <textarea className="content-tab__input content-tab__input--description styled" placeholder="Краткое описание"/>
                <div className="content-tab__actions">
                    <button className="action-file">Прикрепить файл</button>
                    <button type="submit" className="action-save">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};
