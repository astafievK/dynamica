import { FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
    value?: string;
    onChange?: (content: string) => void;
}

export const TextEditor: FC<TextEditorProps> = ({ value = '', onChange}) => {
    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
        />
    );
};

const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': [] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
    ],
};


const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "font",
    "size",
    "color",
    "background",
    "align",
    "link",
    "image",
];
