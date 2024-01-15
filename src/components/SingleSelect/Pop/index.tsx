/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { CheckList, Popup, Button } from "antd-mobile";
import styles from "./index.module.scss";

interface IItem {
  id: string | number;
  name: string;
}
interface IProps {
  source: Record<string, any>;
  value?: any;
  onChange?: any;
  // onCancel?: any
  visible: boolean;
  changeVisible: (visible: boolean) => void;
}
const List: React.FC<IProps> = (props: IProps) => {
  const [selected, setSelected] = useState<any[]>([]);
  const [originSelectedIds, setOriginSelectedIds] = useState<(string | number)[]>([]);

  const hanldeChange = (val: any) => {
    setSelected(val);
  };
  const confirm = () => {
    props.onChange && props.onChange(selected);
    props.changeVisible(false);
  };
  const cancel = () => {
    setSelected(originSelectedIds);
    // props.onCancel && props.onCancel()
    props.changeVisible(false);
  };

  useEffect(() => {
    setSelected(props.value);
    setOriginSelectedIds(props.value);
  }, [props.value]);

  return (
    <Popup
      visible={props.visible}
      onMaskClick={cancel}
      onClose={cancel}
      bodyStyle={{ height: "40vh" }}
      bodyClassName={styles["popup-body"]}
    >
      <div className={styles.opts}>
        <div className={styles.opt} onClick={cancel}>
          取消
        </div>
        <div className={styles.opt} onClick={confirm}>
          确认
        </div>
      </div>
      <div className={styles["list-wrap"]}>
        <CheckList multiple value={selected} onChange={hanldeChange}>
          {(props.source || []).map((item: IItem) => {
            return (
              <CheckList.Item key={item.id} value={item.id}>
                {item.name}
              </CheckList.Item>
            );
          })}
        </CheckList>
      </div>
    </Popup>
  );
};
export default List;
