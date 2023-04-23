import styles from "./style.module.scss";
import classNames from "classnames/bind";

import {
  KeyboardArrowUp,
  PersonOutlined,
  AccountBalanceWalletOutlined,
  ShoppingCartOutlined,
  MonetizationOnOutlined,
} from "@mui/icons-material";

let cx = classNames.bind(styles);

const Widget = ({ type }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlined
            className={cx("icon")}
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlined
            className={cx("icon")}
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlined
            className={cx("icon")}
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlined
            className={cx("icon")}
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className={cx("widget")}>
      <div className={cx("left")}>
        <span className={cx("title")}>{data.title}</span>
        <span className={cx("counter")}>
          {data.isMoney && "$"} {amount}
        </span>
        <span className={cx("link")}>{data.link}</span>
      </div>
      <div className={cx("right")}>
        <div className={cx("percentage positive")}>
          <KeyboardArrowUp />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
