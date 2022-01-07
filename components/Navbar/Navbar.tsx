import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

const navigation = [
  { id: 1, title: "О проекте", path: "/" },
  { id: 2, title: "Дерево", path: "/tree" },
];

const Navbar: FC = () => {
  const { pathname } = useRouter();

  return (
    <nav>
      <div>
        <Image src="/favicon.ico" width={60} height={60} alt="webDev" />
      </div>
      <div>
        {navigation.map(({ id, title, path }) => (
          <Link key={id} href={path}>
            <a>{title}</a>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
