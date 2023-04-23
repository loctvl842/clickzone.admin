import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export default function useLogout() {
  const user = useSelector((state) => state.user.data);
  const logout = async () => {
    if (user === null) return;
    try {
      await axios.delete(`/api/auth/logout.php?userId=${user.id}`);
      Cookies.remove("refreshToken");
    } catch (e) {
      console.log(e);
    }
  };
  return logout;
}
