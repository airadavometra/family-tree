import classNames from "classnames";
import { FC } from "react";
import s from "./FamilyLink.module.css";

type FamilyLinkProps = {
  familyName: string;
  href: string;
};

const FamilyLink: FC<FamilyLinkProps> = ({ familyName, href }) => (
  <div className={s.container}>
    <div className={classNames(s.ball)} />
    <a href={href} className={s.familyLink}>
      {familyName}
    </a>
  </div>
);

export default FamilyLink;
