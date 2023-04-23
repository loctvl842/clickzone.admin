import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "~/hook";
import { modalClose } from "~/store/modalSlice";

let cx = classNames.bind(styles);

export const modals = {};
export { default as ProductForm } from "./ProductForm";
export { default as ConfirmBox } from "./ConfirmBox";

const Modal = () => {
  const dispatch = useDispatch();
  const { active, type } = useSelector((state) => state.modal);
  const [visible, setVisible] = useState(false);
  const boxRef = useRef();

  useClickOutside([boxRef], () => {
    if (active) {
      dispatch(modalClose());
    }
  });

  useEffect(() => {
    if (active) setVisible(true);
  }, [active]);

  const handleAnimationEnd = () => {
    if (!active) setVisible(false);
  };

  return (
    <>
      {visible && (
        <div
          className={cx("container", { closing: !active })}
          onAnimationEnd={handleAnimationEnd}
        >
          <div ref={boxRef} className={cx("box")}>
            {modals[type]}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
