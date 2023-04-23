import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { DataGrid } from "@mui/x-data-grid";

let cx = classNames.bind(styles);

const DataTable = ({ title, columns, rows }) => {
  return (
    <div className={cx("datatable")}>
      <div className={cx("datatableTitle")}>{title}</div>
      <DataGrid
        className={cx("datagrid")}
        rows={rows}
        columns={columns}
        pageSizeOptions={[3]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 3, page: 0 },
          },
        }}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
