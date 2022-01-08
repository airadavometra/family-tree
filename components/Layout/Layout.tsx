import { FC, ReactNode } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import s from "./Layout.module.css";

type layoutProps = {
  children: ReactNode;
};

const Layout: FC<layoutProps> = ({ children }) => (
  <div className={s.layout}>
    <Header />
    {children}
    <Footer />
  </div>
);

export default Layout;
