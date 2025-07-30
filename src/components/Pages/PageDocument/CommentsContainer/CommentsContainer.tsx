import { FC } from "react";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import "./CommentsContainer.css";

const currentUserId = 3;

const comments = [
    {
        id_author: 1,
        author_name: "John Doe",
        content: "Комментарий от John",
        datetime: "24.08.2024 11:00",
    },
    {
        id_author: 3,
        author_name: "Текущий пользователь",
        content: "Мой комментарий",
        datetime: "25.08.2024 23:52",
    },
    {
        id_author: 2,
        author_name: "Jane Smith",
        content: "Комментарий от Jane",
        datetime: "26.08.2024 9:05",
    },
];

export const CommentsContainer: FC = () => {
    return (
        <div className="comments-wrapper">
                <span className="comments__title">Комментарии</span>
                <ul className="comments__list">
                    {comments.map((comment, index) => (
                        <li
                            key={index}
                            className={`comment${
                                comment.id_author === currentUserId ? " current-author" : ""
                            }`}
                        >
                            {
                                comment.id_author !== currentUserId && <span className="comment__author">{comment.author_name}</span>
                            }
                            <span className="comment__content">{comment.content}</span>
                            <span className="comment__datetime">{comment.datetime}</span>
                        </li>
                    ))}
                    {comments.map((comment, index) => (
                        <li
                            key={index}
                            className={`comment${
                                comment.id_author === currentUserId ? " current-author" : ""
                            }`}
                        >
                            {
                                comment.id_author !== currentUserId && <span className="comment__author">{comment.author_name}</span>
                            }
                            <span className="comment__content">{comment.content}</span>
                            <span className="comment__datetime">{comment.datetime}</span>
                        </li>
                    ))}
                    {comments.map((comment, index) => (
                        <li
                            key={index}
                            className={`comment${
                                comment.id_author === currentUserId ? " current-author" : ""
                            }`}
                        >
                            {
                                comment.id_author !== currentUserId && <span className="comment__author">{comment.author_name}</span>
                            }
                            <span className="comment__content">{comment.content}</span>
                            <span className="comment__datetime">{comment.datetime}</span>
                        </li>
                    ))}
                    {comments.map((comment, index) => (
                        <li
                            key={index}
                            className={`comment${
                                comment.id_author === currentUserId ? " current-author" : ""
                            }`}
                        >
                            {
                                comment.id_author !== currentUserId && <span className="comment__author">{comment.author_name}</span>
                            }
                            <span className="comment__content">{comment.content}</span>
                            <span className="comment__datetime">{comment.datetime}</span>
                        </li>
                    ))}
                </ul>
                <div className="create-comment-container">
                    <input type="text" className={"styled create-comment__input"} placeholder={"Комментарий"}/>
                    <button className={"create-comment__button"}>
                        <SendRoundedIcon/>
                    </button>
                </div>
            </div>
    );
};
