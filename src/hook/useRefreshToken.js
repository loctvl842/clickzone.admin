import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

// store
import { authAccessTokenUpdate } from "~/store/authSlice";

export default function useRefreshToken() {
  const dispatch = useDispatch();
  const refresh = async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken === undefined) return;
    const res = await axios.post("/api/auth/token.php", { refreshToken });
    const accessToken = res.data.accessToken;
    dispatch(authAccessTokenUpdate(accessToken));
    return accessToken;
  };
  return refresh;
}
