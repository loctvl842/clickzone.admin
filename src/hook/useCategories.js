import axios from "axios";
import { useEffect, useState } from "react";
import { groupCategories } from "~/util";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/category/get_all.php");
        const categoriesWithRelation = res.data.categories;
        const arrangedCategories = groupCategories(categoriesWithRelation);
        setCategories(arrangedCategories);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, []);
  return categories;
}
