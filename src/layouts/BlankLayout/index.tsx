import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.scss";

const BlankLayout: React.FC = () => {
  return (
    <div className={styles.root}>
      <Outlet />
    </div>
  );
};
export default memo(BlankLayout);
