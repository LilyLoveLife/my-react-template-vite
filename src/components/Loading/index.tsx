import React from "react";
import LoadingIcon from "img/loading.gif";
import styles from "./index.module.scss";

interface IProps {
  visible: boolean;
  text: string;
}
const List: React.FC<IProps> = (props: IProps) => {
  return props.visible ? (
    <>
      <div className={styles.mask} />
      <div className={styles.container}>
        <img className={styles.icon} src={LoadingIcon} />
        <div className={styles.text}>{props.text}</div>
      </div>
    </>
  ) : (
    ""
  );
};
export default List;
