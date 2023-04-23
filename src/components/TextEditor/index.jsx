import styles from "./style.module.scss";
import classNames from "classnames/bind";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useState, useCallback } from "react";

let cx = classNames.bind(styles);

const TextEditor = () => {
  const [quill, setQuill] = useState(null);
  const editorContainerRef = useCallback((editorContainer) => {
    if (editorContainer === null) return;
    editorContainer.innerHTML = "";
    const editor = document.createElement("div");
    editorContainer.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
    });
    setQuill(q);
  }, []);

  return <div id="editor" ref={editorContainerRef} className={cx("editor-container")}></div>;
};

export default TextEditor;
