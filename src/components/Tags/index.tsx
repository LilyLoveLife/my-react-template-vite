import React from "react";
import styles from "./index.module.scss";

interface ITag {
  bgColor?: string;
  fontColor?: string;
  name?: string;
}
interface IProps {
  tags: ITag[] | undefined;
}
const Tags = (props: IProps) => {
  const { tags = [] } = props;
  return (
    <div>
      {(tags || []).map((tag: any, index: number) => {
        return (
          <div key={index} className={styles.tag} style={{ backgroundColor: tag.bgColor, color: tag.fontColor }}>
            {tag.name}
          </div>
        );
      })}
    </div>
  );
};
export default Tags;
