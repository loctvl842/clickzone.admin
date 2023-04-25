import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";

let cx = classNames.bind(styles);

const FormControl = ({
  icon,
  name,
  placeholder,
  type,
  required,
  className,
}) => {
  const isInputField = type === "password";
  const [visible, setVisible] = useState(false);
  const IconLabel = icon;

  return (
    <div className={className}>
      <label htmlFor={name} className={cx("form-control")}>
        {IconLabel && (
          <div className={cx("icon")}>
            <IconLabel />
          </div>
        )}
        <input
          id={name}
          type={isInputField ? (visible ? "text" : "password") : type}
          name={name}
          placeholder={placeholder}
          required={required}
        />
        {type === "password" && (
          <div
            className={cx("visibility")}
            onClick={() => {
              setVisible((visible) => !visible);
            }}
          >
            {visible ? (
              <Visibility fontSize="small" />
            ) : (
              <VisibilityOff fontSize="small" />
            )}
          </div>
        )}
      </label>
    </div>
  );
};

export default FormControl;
