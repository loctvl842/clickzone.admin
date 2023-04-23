import { useEffect, useRef, useState } from "react";

export default function usePreviewImage(file) {
  const [imgSrc, setImgSrc] = useState("");

  const reader = useRef(); // reference to reader in FileReader
  useEffect(() => {
    if (reader.current) reader.current.abort();
    if (typeof file === "string") {
      setImgSrc(file);
      return;
    }
    if (file === undefined || file === null) {
      setImgSrc("");
      return;
    }
    reader.current = new FileReader();

    reader.current.onload = () => {
      if (reader.current.readyState === 2) {
        setImgSrc(reader.current.result);
      }
    };
    reader.current.readAsDataURL(file);
  }, [file]);
  return imgSrc;
}
