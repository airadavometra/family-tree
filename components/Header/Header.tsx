import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import s from "./Header.module.css";
import classNames from "classnames";

const navigation = [
  { id: 1, title: "О проекте", path: "/" },
  { id: 2, title: "Дерево", path: "/tree" },
];

const Header: FC = () => {
  const router = useRouter();
  return (
    <header className={s.navbar}>
      <div className={s.logoContainer}>
        <Image
          src="/favicon.ico"
          width={40}
          height={34}
          alt="Логотип проекта древо"
        />
        <span className={s.logoTitle}>ДРЕВО</span>
      </div>
      <nav>
        {navigation.map(({ id, title, path }) => {
          const { root } = router.query;
          const queryRootId = root
            ? Array.isArray(root)
              ? root[0]
              : root
            : undefined;
          let fullPath = path;
          if (queryRootId) {
            fullPath = `${fullPath}?root=${queryRootId}`;
          }
          return (
            <Link key={id} href={fullPath}>
              <a
                className={classNames(s.link, {
                  [s.selected]: path === router.pathname,
                })}
              >
                {title}
              </a>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
