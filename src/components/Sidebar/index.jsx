import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import {
  Dashboard,
  PersonOutline,
  LocalShipping,
  CreditCard,
  Store,
  InsertChart,
  NotificationsNone,
} from "@mui/icons-material";
import { Logo } from "~/components";

let cx = classNames.bind(styles);

const Sidebar = () => {
  return (
    <div className={cx("sidebar")}>
      <div className={cx("top")}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span className={cx("logo")}>
            <Logo size={25} />
          </span>
        </NavLink>
      </div>
      <hr />
      <div className={cx("center")}>
        <ul>
          <NavLink to="/" style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <li className={cx({ active: isActive })}>
                <Dashboard className={cx("icon")} />
                <span>Dashboard</span>
              </li>
            )}
          </NavLink>
          <NavLink to="/customer" style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <li className={cx({ active: isActive })}>
                <PersonOutline className={cx("icon")} />
                <span>Customers</span>
              </li>
            )}
          </NavLink>
          <NavLink to="/product" style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <li className={cx({ active: isActive })}>
                <Store className={cx("icon")} />
                <span>Products</span>
              </li>
            )}
          </NavLink>
          <NavLink to="/order" style={{ textDecoration: "none" }}>
            {({ isActive }) => (
              <li className={cx({ active: isActive })}>
                <CreditCard className={cx("icon")} />
                <span>Orders</span>
              </li>
            )}
          </NavLink>
          <li>
            <LocalShipping className={cx("icon")} />
            <span>Delivery</span>
          </li>
          <li>
            <InsertChart className={cx("icon")} />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNone className={cx("icon")} />
            <span>Notifications</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
