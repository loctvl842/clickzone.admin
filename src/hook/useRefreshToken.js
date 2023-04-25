import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// store
import { authAccessTokenUpdate } from "~/store/authSlice";

export default function useRefreshToken() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const refresh = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken === undefined) return;
      const res = await axios.post("/api/auth/token.php", { refreshToken });
      const accessToken = res.data.accessToken;
      dispatch(authAccessTokenUpdate(accessToken));
      return accessToken;
    } catch (e) {
      if (e.response.status >= 400 && e.response.status < 500) {
        navigate("/login");
      }
    }
  };
  return refresh;
}
