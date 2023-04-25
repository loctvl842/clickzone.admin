import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { useCategories } from "~/hook";
import { v4 as uuidv4 } from "uuid";
import { NavigateNext } from "@mui/icons-material";

let cx = classNames.bind(styles);

const Categories = ({ setCategory }) => {
  const categories = useCategories();

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  return (
    <div className={cx("container")}>
      <ul>
        {categories.map((category) => (
          <li key={uuidv4()}>
            <div
              className={cx("item-0")}
              onClick={() => handleCategoryClick(category)}
            >
              <span className={cx("active-bar")}></span>
              <span>{category.name}</span>
              {category.categories && (
                <div className={cx("nav-icon")}>
                  <NavigateNext fontSize="small" />
                </div>
              )}
            </div>
            {category.categories && (
              <div className={cx("menu-1")}>
                <ul>
                  {category.categories.map((category) => (
                    <li key={uuidv4()}>
                      <div
                        className={cx("item-1")}
                        onClick={() => handleCategoryClick(category)}
                      >
                        <span>{category.name}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
