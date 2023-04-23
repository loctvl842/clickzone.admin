import axios from "axios";
import { useEffect, useState } from "react";

export default function usePageCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const countProduct = async () => {
      const pageSize = import.meta.env.VITE_PAGE_SIZE;
      try {
        const res = await axios.get("api/product/count.php");
        const productCount = res.data;
        const pageCount = parseInt(productCount / pageSize) + 1;
        setCount(pageCount);
      } catch (e) {
        console.log(e.response.data);
      }
    };
    countProduct();
  }, []);
  return count;
}
