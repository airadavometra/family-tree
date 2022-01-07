import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import s from "./Navbar.module.css";
import classNames from "classnames";
import { useRouter } from "next/router";

const navigation = [
  { id: 1, title: "О проекте", path: "/" },
  { id: 2, title: "Дерево", path: "/tree" },
];

const Navbar: FC = () => {
  const { pathname } = useRouter();
  return (
    <nav className={s.navbar}>
      <div className={s.logoContainer}>
        <Image
          src="/favicon.ico"
          width={40}
          height={34}
          alt="Логотип проекта древо"
        />
        <span className={s.logoTitle}>ДРЕВО</span>
      </div>
      <div>
        {navigation.map(({ id, title, path }) => (
          <Link key={id} href={path}>
            <a
              className={classNames(s.link, {
                [s.selected]: path === pathname,
              })}
            >
              {title}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
