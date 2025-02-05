import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const TextEditor = () => {
    const [content, setContent] = useState("");

    const handleSave = async () => {
        try {
            console.log(content);
            alert("Текст сохранён!");
        } catch (error) {
            console.error("Ошибка сохранения:", error);
            alert("Ошибка при сохранении текста");
        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <ReactQuill value={content} onChange={setContent} modules={modules} formats={formats} />
            <button onClick={handleSave} className="mt-4">Сохранить</button>
        </div>
    );
};

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ size: [] }],
        ["clean"],
    ],
};

const formats = ["header", "bold", "italic", "list", "bullet", "size"];
