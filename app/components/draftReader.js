// components/DraftEditor.js
"use client"; // Enforce client-side rendering
import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DraftReader = ({ value, onChange }) => {
  // Initialize editor state with content if provided
  const [editorState, setEditorState] = useState(() =>
    value
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value)))
      : EditorState.createEmpty()
  );

  return (
    <div className="">
      <Editor editorState={editorState} readOnly={true} toolbarHidden={true} />
    </div>
  );
};

export default DraftReader;
