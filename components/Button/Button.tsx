import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import s from "./Button.module.css";

type ButtonProps = {
  href: string;
  text: string;
  className?: string;
  isSecondary?: boolean;
  newTab?: boolean;
};

const Button: FC<ButtonProps> = ({
  href,
  text,
  className,
  isSecondary,
  newTab,
}) => (
  <Link href={href}>
    <a
      className={classNames(s.button, className, {
        [s.secondaryButton]: isSecondary,
      })}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
    >
      {text}
    </a>
  </Link>
);

export default Button;
