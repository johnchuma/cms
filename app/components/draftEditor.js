"use client"; // Enforce client-side rendering
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Dynamically import Editor from react-draft-wysiwyg
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const DraftEditor = ({ value, onChange }) => {
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
    <div className="bg-background p-2 rounded-lg min-h-[150px]">
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
          fontSize: { options: [8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60] },
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
