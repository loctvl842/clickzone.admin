import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { DataTable } from "~/components";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshToken } from "~/hook";
import { customerSet, selectAllCustomers } from "~/store/customerSlice";
import dayjs from "dayjs";

const cx = classNames.bind(styles);

const UserList = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refresh = useRefreshToken();
  const customers = useSelector((state) => selectAllCustomers(state));
  console.log(customers);

  const customerColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "username", headerName: "Username", width: 250 },
    { field: "telephone", headerName: "Telephone", width: 200 },
    {
      field: "created_at",
      headerName: "Joined on",
      width: 250,
      renderCell: (params) => {
        return dayjs(params.row.created_at).format("MMMM D, HH:mm a");
      },
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/user/get_all.php", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        dispatch(customerSet(res.data.users));
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
        title={"Customers"}
        columns={customerColumns}
        rows={customers}
      />
    </div>
  );
};

export default UserList;
