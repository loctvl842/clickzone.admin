import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { DataTable, OrderTable } from "~/components";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshToken } from "~/hook";
import dayjs from "dayjs";
import { groupOrdersInDetail } from "~/util";
import { ordersSet, selectAllOrders } from "~/store/orderSlice";

const cx = classNames.bind(styles);

const OrderList = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refresh = useRefreshToken();
  const orders = useSelector((state) => selectAllOrders(state));

  const columns = [
    { field: "id", headerName: "ID", width: 40 },
    { field: "user_id", headerName: "User ID", width: 200 },
    { field: "username", headerName: "Ordered By", width: 200 },
    {
      field: "created_at",
      headerName: "Ordered On",
      width: 200,
      renderCell: (params) => {
        return dayjs(params.row.created_at).format("MMMM D, HH:mm a");
      },
    },
    {
      field: "order_items",
      headerName: "Items",
      width: 550,
      renderCell: (params) => {
        const items = params.row.order_items;
        return <OrderTable items={items} />;
      },
    },
    { field: "total", headerName: "Total", width: 250 },
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/order_details/get_all.php", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        const orderData = res.data.orders;
        dispatch(ordersSet(groupOrdersInDetail(orderData)));
      } catch (e) {
        if (e.response.status >= 400 && e.response.status < 500) {
          await refresh();
        }
      }
    };
    fetch();
  }, [accessToken]);

  return (
    <div className={cx("container")}>
      <DataTable
        title={"Orders"}
        columns={columns}
        rows={orders}
        getRowHeight={() => "auto"}
      />
    </div>
  );
};

export default OrderList;
