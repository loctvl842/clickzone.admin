import styles from "./style.module.scss";
import classNames from "classnames/bind";

import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useState, useCallback, useEffect } from "react";
import { uploadImage } from "~/s3";

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
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ["bold", "italic", "underline"],
          ["image"],
        ],
      },
    });
    setQuill(q);
  }, []);

  useEffect(() => {
    if (quill === null) return;
    const toolbar = quill.getModule("toolbar");

    toolbar.addHandler("image", () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.onchange = async () => {
        const file = input.files[0];
        const imageUrl = await uploadImage(file);
        console.log(imageUrl);
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, "image", imageUrl);
      };
      input.click();
    });
  }, [quill]);

  return (
    <div
      id="editor"
      ref={editorContainerRef}
      className={cx("editor-container")}
    ></div>
  );
};

export default TextEditor;
