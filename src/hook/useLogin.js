import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authStart, authSuccess, authFail } from "~/store/authSlice";

export default function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async ({ email, password }) => {
    try {
      dispatch(authStart());
      const res = await axios.post("/api/auth/login.php", { email, password });
      dispatch(authSuccess(res.data.tokens));
      navigate("/home");
    } catch (err) {
      dispatch(authFail(err.response.data.message));
    }
  };
  return login;
}
