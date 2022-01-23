import { FC } from "react";
import s from "./Widget.module.css";
import { getNodesCount } from "./utils";

type WidgetProps = {
  title: string;
  value: string;
};

const Widget: FC<WidgetProps> = ({ title, value }) => {
  return (
    <div className={s.widgetContainer}>
      <span className={s.widgetTitle}>{title}</span>
      <span className={s.widgetValue}>{value}</span>
    </div>
  );
};

export default Widget;
