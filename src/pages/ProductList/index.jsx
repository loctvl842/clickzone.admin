import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Navbar, Sidebar, DataTable, PersistUser } from "~/components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByPage,
  removeProduct,
  selectAllProducts,
} from "~/store/productSlice";
import { ConfirmBox, modals, ProductForm } from "~/modal";
import { modalClose, modalOpen } from "~/store/modalSlice";
import { Edit, Delete } from "@mui/icons-material";

let cx = classNames.bind(styles);

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => selectAllProducts(state));
  const productStatus = useSelector((state) => state.product.status);

  const productColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 230 },
    {
      field: "image_url",
      headerName: "Image",
      width: 70,
      renderCell: (params) => {
        return <img className={cx("image")} src={params.row.image_url} />;
      },
    },
    { field: "price", headerName: "Price", width: 100 },
    { field: "old_price", headerName: "Old Price", width: 100 },
    { field: "description", headerName: "Description", width: 450 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={cx("cell-action")}>
            <button
              className={cx("btn", "btn--success")}
              onClick={() => handleEditProduct(params.row)}
            >
              <Edit fontSize="small" />
            </button>
            <button
              className={cx("btn", "btn--fail")}
              onClick={() => handleDeleteBtnClick(params.row)}
            >
              <Delete fontSize="small" />
            </button>
          </div>
        );
      },
    },
  ];

  const handleAddNewProductClick = () => {
    modals[ProductForm.modal_type] = <ProductForm />;
    dispatch(modalOpen(ProductForm.modal_type));
  };

  const handleEditProduct = (product) => {
    modals[ProductForm.modal_type] = <ProductForm product={product} />;
    dispatch(modalOpen(ProductForm.modal_type));
  };

  const handleDeleteBtnClick = (product) => {
    modals[ConfirmBox.modal_type] = (
      <ConfirmBox
        question={`Are you sure you want to remove <b>${product.name}</b> from your shop?`}
        confirmBtnText="Remove"
        onConfirm={() => handleRemoveConfirm(product)}
      />
    );
    dispatch(modalOpen(ConfirmBox.modal_type));
  };

  const handleRemoveConfirm = (product) => {
    dispatch(removeProduct(product.id));
    dispatch(modalClose());
  };

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProductsByPage({ sort: 0, page: 0 }));
    }
  }, [dispatch, productStatus]);

  return (
    <PersistUser>
      <div className={cx("list")}>
        <Sidebar />
        <div className={cx("listContainer")}>
          <Navbar />
          <div className={cx("container")}>
            <button
              className={cx("add-btn")}
              onClick={handleAddNewProductClick}
            >
              Add New
            </button>
            <DataTable
              title={"Product"}
              columns={productColumns}
              rows={products}
            />
          </div>
        </div>
      </div>
    </PersistUser>
  );
};

export default ProductList;
