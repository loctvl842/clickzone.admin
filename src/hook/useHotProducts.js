import axios from "axios";
import { useEffect, useState } from "react";

export default function useHotProducts() {
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/product/get_hot_items.php");
        setProducts(res.data.products);
      } catch (e) {
        console.log(e.response.data);
      }
    };
    fetch();
  }, []);
  return products;
}
