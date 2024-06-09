import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

const Editor = ({ content, handleEditorChange }) => (
    <ReactQuill
        value={content}
        onChange={handleEditorChange}
        modules={editorModules}
        formats={editorFormats}
        theme="snow"
    />
);

const editorModules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ['link', 'image', 'video'],
        ['clean']
    ],
};

const editorFormats = [
    'header', 'font', 'list', 'bullet',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'align', 'color', 'background',
    'link', 'image', 'video'
];

export default Editor;
