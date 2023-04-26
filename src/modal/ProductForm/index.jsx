import styles from "./style.module.scss";
import classNames from "classnames/bind";

// libraries
import { PulseLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import { FormControl, TextEditor, Categories } from "~/components";

// icons
import { AddAPhoto, Close } from "@mui/icons-material";

// custom hook
import { usePreviewImage } from "~/hook";

// actions
import { addProduct, editProduct, productStart } from "~/store/productSlice";

// s3
import { uploadImage } from "~/s3";

// modals
import { modalClose } from "~/store/modalSlice";

let cx = classNames.bind(styles);
const EDIT = "edit";
const CREATE = "create";

const ProductForm = ({ product }) => {
  let action = product ? EDIT : CREATE;

  const dispatch = useDispatch();
  const [productImgFile, setProductImgFile] = useState(null);
  const [category, setCategory] = useState({
    id: -1,
    name: "",
  });
  const productStatus = useSelector((state) => state.product.status);
  let previewImg = usePreviewImage(productImgFile);

  const handleCancelImageBtnClick = (e) => {
    e.preventDefault();
    setProductImgFile(null);
  };

  const handleImgDrop = (e) => {
    e.preventDefault();
    setProductImgFile(e.dataTransfer.files[0]);
  };

  const handleProductImgChange = (e) => {
    setProductImgFile(e.target.files[0]);
  };

  const handleCloseBtnClick = () => {
    dispatch(modalClose());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(productStart());
    const formData = new FormData(e.currentTarget);
    const dataArray = [...formData];
    const inputData = Object.fromEntries(dataArray);

    try {
      const imageUrl = await uploadImage(productImgFile);
      const productData = {
        id: product ? product.id : -1,
        name: inputData["product-creation_name"],
        image_url: imageUrl,
        category_id: inputData["product-creation_category"],
        price: inputData["product-creation_price"],
        old_price: inputData["product-creation_old-price"] || null,
        description: document.querySelector(".ql-editor").innerHTML,
      };
      if (action === EDIT) {
        dispatch(editProduct(productData));
      } else {
        dispatch(addProduct(productData));
      }
      dispatch(modalClose());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (action === EDIT) {
      let nameEle = document.getElementById("product-creation_name");
      let oldPriceEle = document.getElementById("product-creation_old-price");
      let priceEle = document.getElementById("product-creation_price");
      let descriptionEle = document.querySelector(".ql-editor");
      nameEle.value = product.name;
      oldPriceEle.value = product.old_price;
      priceEle.value = product.price;
      descriptionEle.innerHTML = product.description;
      setProductImgFile(product.image_url);
      setCategory({ id: product.category_id, name: product.category_name });
    }
  }, [action, product]);

  return (
    <div className={cx("form-wrapper")}>
      <div className={cx("message-wrapper", { visible: false })}>
        <p className={cx("message")}>some message</p>
      </div>
      <div className={cx("card")}>
        <div className={cx("header")}>
          <h2>{action === EDIT ? "Edit Product" : "Add Product"}</h2>
          <button
            className={cx("close-btn-wrapper")}
            onClick={handleCloseBtnClick}
          >
            <Close />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={cx("form-product-creation")}>
          <div className={cx("form-data")}>
            <div className={cx("row-1")}>
              <div className={cx("col-5")}>
                <div className={cx("square-box")}>
                  <div className={cx("choose-img-wrapper")}>
                    <button
                      className={cx("cancel-current-img-btn", {
                        visible: previewImg !== "",
                      })}
                      onClick={handleCancelImageBtnClick}
                    >
                      <Close />
                    </button>
                    <input
                      type="file"
                      id="file"
                      name="product-creation_imgFile"
                      style={{ display: "none" }}
                      accept=".png, .jpg, .jpeg"
                      onChange={handleProductImgChange}
                    />
                    {previewImg !== "" ? (
                      <div className={cx("preview-img-wrapper")}>
                        <img
                          id="product-creation_preview-image"
                          src={previewImg}
                          alt=""
                        />
                      </div>
                    ) : (
                      <label
                        htmlFor="file"
                        className={cx("choose-img-btn")}
                        onDrop={handleImgDrop}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        <div className={cx("description")}>
                          <div className={cx("icon-wrapper")}>
                            <AddAPhoto />
                          </div>
                          <span className={cx("text-1")}>
                            Add Photos/Videos
                          </span>
                          <span className={cx("text-2")}>or drag and drop</span>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>
              <div className={cx("col-7")}>
                <div className={cx("form-control-wrapper")}>
                  <FormControl
                    name="product-creation_name"
                    placeholder="Product name"
                    type="text"
                    required={true}
                  />
                </div>
                <div className={cx("form-control-wrapper")}>
                  <div className={cx("categories-container")}>
                    <div className={cx("showcase")}>
                      {category.name === "" && (
                        <div className={cx("placeholder")}>
                          <p>Category</p>
                        </div>
                      )}
                      <input
                        type="hidden"
                        name="product-creation_category"
                        value={category.id}
                      />
                      <p>{category.name}</p>
                      <div className={cx("categories-wrapper")}>
                        <Categories setCategory={setCategory} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx("form-control-wrapper")}>
                  <FormControl
                    name="product-creation_old-price"
                    placeholder="Old Price (if available)"
                    type="text"
                  />
                </div>
                <div className={cx("form-control-wrapper")}>
                  <FormControl
                    name="product-creation_price"
                    placeholder="Price"
                    type="text"
                    required={true}
                  />
                </div>
              </div>
            </div>
            <div className={cx("row-2")}>
              <div className={cx("col-12")}>
                <TextEditor />
              </div>
            </div>
          </div>
          <div className={cx("submit-btn-wrapper")}>
            <button type="submit" className={cx("submit-btn")}>
              {productStatus !== "loading" && (
                <span>{action === EDIT ? "Edit" : "Create"}</span>
              )}
              <PulseLoader
                color="#fff"
                size={5}
                loading={productStatus === "loading"}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductForm.modal_type = "productForm";

export default ProductForm;
