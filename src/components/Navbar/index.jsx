import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { SearchOutlined } from "@mui/icons-material";

let cx = classNames.bind(styles);

const Navbar = () => {
  return (
    <div className={cx("navbar")}>
      <div className={cx("wrapper")}>
        <div className={cx("search")}>
          <input type="text" placeholder="Search..." />
          <SearchOutlined />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
