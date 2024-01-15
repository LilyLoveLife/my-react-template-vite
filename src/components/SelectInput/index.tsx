/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import cs from "classnames";
import { DownOutline } from "antd-mobile-icons";
import styles from "./index.module.scss";

interface IProps {
  value?: any; // 显示的文案
  onClick?: () => void;
  visible: boolean;
  placeholder?: string;
  className?: string;
}
const List: React.FC<IProps> = (props: IProps) => {
  return (
    <div className={cs(styles["select-input"], props.className)} onClick={props.onClick}>
      <div className={styles.selectedText}>
        {props.value || <span style={{ color: "#BEBEBE" }}>{props.placeholder || "请选择"}</span>}
      </div>
      <DownOutline className={props.visible ? styles.arrowUp : styles.arrowDown} />
    </div>
  );
};
export default List;
