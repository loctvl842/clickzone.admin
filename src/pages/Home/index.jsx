import styles from "./style.module.scss";
import classNames from "classnames/bind";

import {
  Sidebar,
  Widget,
  Navbar,
  Featured,
  Chart,
  Table,
  PersistUser,
} from "~/components";

let cx = classNames.bind(styles);

const Home = () => {
  return (
    <PersistUser>
      <div className={cx("home")}>
        <Sidebar />
        <div className={cx("homeContainer")}>
          <Navbar />
          <div className={cx("widgets")}>
            <Widget type={cx("user")} />
            <Widget type={cx("order")} />
            <Widget type={cx("earning")} />
            <Widget type={cx("balance")} />
          </div>
          <div className={cx("charts")}>
            <Featured />
            <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
          </div>
          <div className={cx("listContainer")}>
            <div className={cx("listTitle")}>Latest Transactions</div>
            <Table />
          </div>
        </div>
      </div>
    </PersistUser>
  );
};

export default Home;
