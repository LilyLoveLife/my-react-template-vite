import React, { useEffect, useState } from "react";
import { CheckList, Popup } from "antd-mobile";
import styles from "./index.module.scss";

interface IProps {
  source: Record<string, any>;
  value?: any;
  onChange?: any;
  visible: boolean;
  changeVisible: (visible: boolean) => void;
  fieldNames: { label: string; value: string };
}
const List: React.FC<IProps> = (props: IProps) => {
  const [selected, setSelected] = useState<any[]>([]);
  const [originSelectedIds, setOriginSelectedIds] = useState<(string | number)[]>([]);
  const { fieldNames } = props;
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
          {(props.source || []).map((item: any) => {
            const val = item[fieldNames.value];
            const label = item[fieldNames.label];
            return (
              <CheckList.Item key={val} value={val}>
                {label}
              </CheckList.Item>
            );
          })}
        </CheckList>
      </div>
    </Popup>
  );
};
export default List;
