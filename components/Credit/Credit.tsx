import classNames from "classnames";
import { FC } from "react";
import s from "./Credit.module.css";

type CreditProps = {
  name: string;
  description?: string;
};

const Credit: FC<CreditProps> = ({ name, description }) => (
  <div className={s.container}>
    <div className={classNames(s.ball)} />
    <span className={s.credit}>
      {description ? `${name} ${description}` : name}
    </span>
  </div>
);

export default Credit;
