import { useEffect, useState } from "react";

export default function useNavbarFloat() {
  const [float, setFloat] = useState(false);
  useEffect(() => {
    // const pageContent = document.getElementById("PageContent");
    const handleScroll = () => {
      setFloat(() => window.scrollY > 200);
      // pageContent.style.marginTop = window.scrollY >= 200 ? "106px" : "0";
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return float;
}
