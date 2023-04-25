import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { PersistUser } from "~/providers";
import { Sidebar } from "~/components";

let cx = classNames.bind(styles);

const MainLayout = ({ content }) => {
  const PageContent = content;

  return (
    <PersistUser>
      <div className={cx("mainlayout")}>
        <Sidebar />
        <div className={cx("content-container")}>
          <PageContent />
        </div>
      </div>
    </PersistUser>
  );
};

export default MainLayout;
