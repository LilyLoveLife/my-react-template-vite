import React, { useState, useEffect, useMemo } from "react";
import SelectInput from "../SelectInput";
import Pop from "./Pop";

interface IProps {
  options: any[];
  value?: any;
  onChange?: any;
  /** 控制渲染的字段和选中的字段, 同PC的Select组件 */
  fieldNames?: { label: string; value: string };
}
const List: React.FC<IProps> = (props: IProps) => {
  const [popVisible, setPopVisible] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const { fieldNames } = props;
  const { label: fieldLabel = "label", value: fieldValue = "value" } = fieldNames || {};

  const handleClick = () => {
    setPopVisible(!popVisible);
  };
  const handleVisible = (visible: boolean) => {
    setPopVisible(visible);
  };
  const hanldeChange = (val: any) => {
    setSelectedIds(val);
    props.onChange && props.onChange(val);
  };

  useEffect(() => {
    setSelectedIds(props.value || []);
  }, [props.value]);

  // input框回显
  const inputValueMemo = useMemo(() => {
    if (!(selectedIds && selectedIds.length && props.options && props.options.length)) return undefined;
    const selectedRecord = props.options.filter((option: any) => {
      return selectedIds.includes(option[fieldValue]);
    });
    const nameList = selectedRecord.map((each: any) => each[fieldLabel]);
    return nameList.join("、");
  }, [selectedIds, fieldLabel, fieldValue, props.options]);

  return (
    <div>
      <SelectInput value={inputValueMemo} onClick={handleClick} visible={popVisible} />
      <Pop
        source={props.options}
        value={selectedIds}
        visible={popVisible}
        changeVisible={handleVisible}
        onChange={hanldeChange}
        fieldNames={{ label: fieldLabel, value: fieldValue }}
      />
    </div>
  );
};
export default List;
