import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";

// icons
import { Mail, Key } from "@mui/icons-material";

// components
import { Logo, FormControl } from "~/components";
// store
import { authReset } from "~/store/authSlice";
// hook
import { useLogin } from "~/hook";
// util
import { getFormData } from "~/util";

let cx = classNames.bind(styles);

const Login = () => {
  const dispatch = useDispatch();
  const login = useLogin();
  const { fetching, error, message } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = getFormData(e.currentTarget);
    await login({
      email: formData.login_email,
      password: formData.login_password,
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(authReset());
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, [error, dispatch]);

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("logo-wrapper")}>
          <Logo size={45} />
        </div>
        <div className={cx("form-wrapper")}>
          <div className={cx("message-wrapper", { visible: error })}>
            <p className={cx("message")}>{message}</p>
          </div>
          <div className={cx("card")}>
            <div className={cx("header")}>
              <h2>Log in</h2>
            </div>
            <form className={cx("form-login")} onSubmit={handleLogin}>
              <div className={cx("form-control-wrapper")}>
                <FormControl
                  icon={Mail}
                  name="login_email"
                  placeholder="Your email"
                  type="email"
                  required={true}
                />
              </div>
              <div className={cx("form-control-wrapper")}>
                <FormControl
                  icon={Key}
                  name="login_password"
                  placeholder="Your password"
                  type="password"
                />
              </div>
              <button type="submit" className={cx("submit-btn")}>
                {!fetching && <span>Log In</span>}
                <PulseLoader color="#fff" size={5} loading={fetching} />
              </button>
              <div className={cx("password-recovery-link")}>
                <NavLink>Forgot password?</NavLink>
              </div>
            </form>
            <div className={cx("separator-wrapper")}>
              <span className={cx("sep-line")}></span>
              <span className={cx("text")}>or</span>
              <span className={cx("sep-line")}></span>
            </div>
            <div className={cx("other-options")}>
              <ul>
                <li>
                  <div className={cx("option-wrapper")}>
                    <div className={cx("logo", "logo-google")}></div>
                    <span className={cx("text")}>Google</span>
                  </div>
                </li>
                <li>
                  <div className={cx("option-wrapper")}>
                    <div className={cx("logo", "logo-fb")}></div>
                    <span className={cx("text")}>Facebook</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={cx("create-account-link")}>
          Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
