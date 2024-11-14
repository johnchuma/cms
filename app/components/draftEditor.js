// components/DraftEditor.js
"use client"; // Enforce client-side rendering
import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftEditor = ({ value, onChange }) => {
  // Initialize editor state with content if provided
  const [editorState, setEditorState] = useState(() =>
    value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      : EditorState.createEmpty()
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
    const content = JSON.stringify(convertToRaw(state.getCurrentContent()));
    onChange(content);
  };

  const uploadImageCallback = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({ data: { link: e.target.result } });
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });

  return (
    <div className="bg-background  p-2 rounded-lg min-h-[150px]">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "colorPicker",
            "link",
            "embedded",
            "emoji",
            "image",
            "history",
          ],
          inline: {
            options: ["bold", "italic", "underline", "strikethrough"],
            fontSize: { options: [8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60] },
          },
          fontSize: { options: [8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60] }, // Ensure correct placement
          image: {
            uploadCallback: uploadImageCallback,
            alt: { present: true, mandatory: false },
            previewImage: true,
          },
        }}
        placeholder="Write information about the project here"
      />
    </div>
  );
};

export default DraftEditor;
