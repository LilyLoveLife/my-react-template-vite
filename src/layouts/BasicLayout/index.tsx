/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getQueryOfSearch } from "utils";
import styles from "./index.module.scss";

const BasicLayout: React.FC = (props) => {
  const queries = getQueryOfSearch();

  useEffect(() => {
    console.log("queries:", queries);
  }, []);

  return (
    <div className={styles["basic-layout"]}>
      <Outlet />
    </div>
  );
};
export default BasicLayout;
