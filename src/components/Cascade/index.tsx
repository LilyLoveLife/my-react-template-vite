import React, { useState, useEffect, useMemo } from "react";
import { Button, Cascader } from "antd-mobile";
import cs from "classnames";
import SelectInput from "../SelectInput";
import styles from "./index.module.scss";

interface FieldNames {
  label: string;
  value: string;
  children?: string;
}

const handleLevelData = (data: any, fieldNames: FieldNames) => {
  const { label = "label", value = "value", children = "children" } = fieldNames;
  // 递归处理数据
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    item.label = item[label];
    item.value = item[value];
    if (Array.isArray(item[children])) {
      item.children = item[children];
      handleLevelData(item.children, fieldNames);
    } else {
      // 组件里面需要这样参数
      item.children = undefined;
    }
  }

  return data;
};

interface IProps {
  options: any[];
  value?: any;
  onChange?: any;
  /** 控制渲染的字段和选中的字段, 同PC的Select组件 */
  fieldNames?: FieldNames;
  inputClassName?: string;
  confirmText?: string;
}
const List: React.FC<IProps> = (props: IProps) => {
  const [popVisible, setPopVisible] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<(string | number)[]>([]);
  const { value, options, fieldNames, onChange, inputClassName, confirmText = "确定" } = props;
  const {
    label: fieldLabel = "label",
    value: fieldValue = "value",
    children: fieldChildren = "children",
  } = fieldNames || {};
  const [hasChildrenTag, setHasChildrenTag] = useState(true);

  const handleClick = () => {
    setPopVisible(!popVisible);
  };
  const handleVisible = (visible: boolean) => {
    setPopVisible(visible);
  };
  const onConfirm = (val: any) => {
    setSelectedValue(val);
    onChange && onChange(val);
    handleVisible(false);
  };

  const onCancel = () => {
    setPopVisible(false);
  };

  useEffect(() => {
    setSelectedValue(value || []);
  }, [value]);

  const cascaderOptions = useMemo(() => {
    // 先用简单的JSON的copy，有缺陷，后面可以改loadsh
    const copyOptions = JSON.parse(JSON.stringify(options));
    return handleLevelData(copyOptions, { label: fieldLabel, value: fieldValue, children: fieldChildren });
  }, [options, fieldLabel, fieldValue, fieldChildren]);

  const cascaderTrigger = (val?: string) => {
    return (
      <SelectInput
        className={cs(styles.input, inputClassName)}
        value={val}
        onClick={handleClick}
        visible={popVisible}
      />
    );
  };

  return (
    <div>
      <Cascader
        options={cascaderOptions}
        visible={popVisible}
        value={selectedValue}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onSelect={(val, extend) => {
          const hasChildren = !!extend.items[extend.items.length - 1]?.children?.length;
          setHasChildrenTag(hasChildren);
        }}
        confirmText={
          <Button fill="none" disabled={hasChildrenTag} color="primary" style={{ fontSize: 15 }}>
            {confirmText}
          </Button>
        }
      >
        {(items) => {
          if (items.every((item) => item === null)) {
            return cascaderTrigger();
          }
          return cascaderTrigger(items.map((item) => item?.label ?? "未选择").join("/"));
        }}
      </Cascader>
    </div>
  );
};
export default List;
