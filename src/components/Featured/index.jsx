import styles from "./style.module.scss";
import classNames from "classnames/bind";

import {
  MoreVert,
  KeyboardArrowDown,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";

let cx = classNames.bind(styles);

const Featured = () => {
  return (
    <div className={cx("featured")}>
      <div className={cx("top")}>
        <h1 className={cx("title")}>Total Revenue</h1>
        <MoreVert fontSize="small" />
      </div>
      <div className={cx("bottom")}>
        <div className={cx("featuredChart")}>
          {/* <CircularProgressbar value={70} text={"70%"} strokeWidth={5} /> */}
          <p>CircularProgressbar</p>
        </div>
        <p className={cx("title")}>Total sales made today</p>
        <p className={cx("amount")}>$420</p>
        <p className={cx("desc")}>
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className={cx("summary")}>
          <div className={cx("item")}>
            <div className={cx("itemTitle")}>Target</div>
            <div className={cx("itemResult", "negative")}>
              <KeyboardArrowDown fontSize="small" />
              <div className={cx("resultAmount")}>$12.4k</div>
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("itemTitle")}>Last Week</div>
            <div className={cx("itemResult", "positive")}>
              <KeyboardArrowUpOutlined fontSize="small" />
              <div className={cx("resultAmount")}>$12.4k</div>
            </div>
          </div>
          <div className={cx("item")}>
            <div className={cx("itemTitle")}>Last Month</div>
            <div className={cx("itemResult", "positive")}>
              <KeyboardArrowUpOutlined fontSize="small" />
              <div className={cx("resultAmount")}>$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
