import styles from "./style.module.scss";
import classNames from "classnames/bind";
// utils
import { formatCurrency } from "~/util";

let cx = classNames.bind(styles);

const OrderTable = ({ items }) => {
  return (
    <div className={cx("container")}>
      <div className={cx("order-items")}>
        <table>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td
                  style={{
                    width: 30,
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <b>{item.quantity}</b>
                </td>
                <td>
                  <b>
                    <div>{item.name}</div>
                  </b>
                  <span className={cx("btn-info")}>Switch: Blue Switch</span>
                  <br />
                  <span>{formatCurrency(item.price)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
