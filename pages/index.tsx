import type { NextPage } from "next";
import NodesCounter from "../components/NodesCounter/NodesCounter";
import Image from "next/image";
import Link from "next/link";
import s from "../styles/HomePage.module.css";
import classNames from "classnames";

const HomePage: NextPage = () => (
  <div className={s.pageContainer}>
    <div className={s.descriptionContainer}>
      <div className={classNames(s.logoContainer, s.descriptionItem)}>
        <Image
          src="/favicon.ico"
          width={127}
          height={108}
          alt="Логотип проекта древо"
        />
        <span className={s.logoTitle}>ДРЕВО</span>
      </div>
      <span className={classNames(s.description, s.descriptionItem)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ex hic quo
        est facere dignissimos esse minima tenetur consequatur, vitae molestias
        tempora qui adipisci amet fugit sapiente deserunt accusamus odit?
      </span>
      <Link href="/tree">
        <button className={classNames(s.button, s.descriptionItem)}>
          Посмотреть дерево
        </button>
      </Link>
    </div>
    <NodesCounter />
  </div>
);

export default HomePage;
