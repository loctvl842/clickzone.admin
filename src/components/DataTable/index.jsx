import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { DataGrid } from "@mui/x-data-grid";

let cx = classNames.bind(styles);

const DataTable = ({ title, columns, rows, getRowHeight }) => {
  return (
    <div className={cx("datatable")}>
      <div className={cx("datatableTitle")}>{title}</div>
      <div className={cx("table-content")}>
        <DataGrid
          className={cx("datagrid")}
          rows={rows}
          autoHeight={true}
          // rowHeight={270}
          getRowHeight={getRowHeight}
          columns={columns}
          pageSizeOptions={[10]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DataTable;
