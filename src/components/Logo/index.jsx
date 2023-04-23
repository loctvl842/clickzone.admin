import styles from "./style.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const Logo = ({ size }) => {
  size = size ?? 28;
  return (
    <div className={cx("container")}>
      <h1 className={cx("logo")} style={{ fontSize: size }}>
        <span>A</span>
        <span>dminZone</span>
      </h1>
    </div>
  );
};

export default Logo;
