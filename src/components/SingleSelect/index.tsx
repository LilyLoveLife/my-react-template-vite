import React, { useState, useEffect, useMemo } from "react";
import { Picker } from "antd-mobile";
import cs from "classnames";
import SelectInput from "../SelectInput";
import styles from "./index.module.scss";

interface IProps {
  options: any[];
  value?: any;
  onChange?: any;
  /** 控制渲染的字段和选中的字段, 同PC的Select组件 */
  fieldNames?: { label: string; value: string };
  inputClassName?: string;
}
const List: React.FC<IProps> = (props: IProps) => {
  const [popVisible, setPopVisible] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | number>("");
  const { value, options, fieldNames, onChange, inputClassName } = props;
  const { label: fieldLabel = "label", value: fieldValue = "value" } = fieldNames || {};

  const handleClick = () => {
    setPopVisible(!popVisible);
  };
  const handleVisible = (visible: boolean) => {
    setPopVisible(visible);
  };
  const hanldeChange = (val: any) => {
    // picker选中时结果为数组，单选下拉取第一个值
    setSelectedValue(val[0]);
    onChange && onChange(val[0]);
  };

  useEffect(() => {
    setSelectedValue(value || []);
  }, [value]);

  // input框回显
  const inputValueMemo = useMemo(() => {
    if (selectedValue === "" || selectedValue === undefined) {
      return undefined;
    }
    const target = options?.find((item) => item[fieldValue] === selectedValue) || {};
    return target[fieldLabel];
  }, [selectedValue, options, fieldLabel, fieldValue]);

  const pickerOptions = useMemo(() => {
    const newOpts = options.map((item) => {
      return {
        value: item[fieldValue],
        label: item[fieldLabel],
      };
    });
    // 二维数组，符合Picker的结构
    return [newOpts];
  }, [options, fieldLabel, fieldValue]);

  return (
    <div>
      <SelectInput
        className={cs(styles.input, inputClassName)}
        value={inputValueMemo}
        onClick={handleClick}
        visible={popVisible}
      />
      <Picker
        columns={pickerOptions}
        visible={popVisible}
        onClose={() => {
          handleVisible(false);
        }}
        value={selectedValue ? [selectedValue] : []}
        onConfirm={(v) => {
          hanldeChange(v);
        }}
      />
    </div>
  );
};
export default List;
