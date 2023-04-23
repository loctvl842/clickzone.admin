import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useSingleProduct() {
  const id = useParams().productId;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetch_data = async () => {
      try {
        const res = await axios.get(`/api/product/get_single_by_id.php?productId=${id}`);
        setProduct(res.data.product);
      } catch (e) {
        console.log(e.response.data);
      }
    };
    fetch_data();
  }, [id]);
  return product;
}
