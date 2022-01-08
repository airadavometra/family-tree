import { FC } from "react";
import s from "./Footer.module.css";

const Footer: FC = () => (
  <footer className={s.footer}>
    <span className={s.footerItem}>DIV DEV STUDIO</span>
    <span className={s.footerItem}>2022</span>
  </footer>
);

export default Footer;
