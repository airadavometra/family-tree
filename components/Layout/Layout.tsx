import { FC, ReactNode } from "react";
import Footer from "../Footer/Footer";
import { PageHead } from "../Head/Head";
import Header from "../Header/Header";
import s from "./Layout.module.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <PageHead />
    <div className={s.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  </>
);

export default Layout;
