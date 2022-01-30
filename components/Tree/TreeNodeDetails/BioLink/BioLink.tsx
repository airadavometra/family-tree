import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import s from "./BioLink.module.css";

type BioLinkProps = {
  href: string;
  text: string;
  newTab?: boolean;
  className?: string;
};

const BioLink: FC<BioLinkProps> = ({ href, text, newTab, className }) => (
  <Link href={href}>
    <a
      className={classNames(s.link, className)}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
    >
      {text}
    </a>
  </Link>
);

export default BioLink;
