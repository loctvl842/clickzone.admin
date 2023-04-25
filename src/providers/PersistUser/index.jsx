import { useDispatch, useSelector } from "react-redux";
import { useFetchCurrentUser, useRefreshToken } from "~/hook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userFetchFinish, userSet } from "~/store/userSlice";
import { authFail } from "~/store/authSlice";

const PersistUser = ({ children, requireLoggedIn = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const fetchCurrenthUser = useFetchCurrentUser();
  const refreshToken = useRefreshToken();
  useEffect(() => {
    const fetch = async () => {
      try {
        let token = accessToken || (await refreshToken());
        if (token) {
          const user = await fetchCurrenthUser(token);
          if (!user.is_admin) {
            throw new Error("You don't have permission to enter this page");
          }
          dispatch(userSet(user));
          dispatch(userFetchFinish());
        } else {
          if (requireLoggedIn) navigate("/login");
        }
      } catch (e) {
        if (e.name === "Error") {
          navigate("/login");
          dispatch(authFail(e.message));
        }
      }
    };
    fetch();
  }, []);
  return <div>{children}</div>;
};

export default PersistUser;
