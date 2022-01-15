import classNames from "classnames";
import type { NextPage } from "next";
import Link from "next/link";
import ballS from "../styles/Ball.module.css";
import s from "../styles/404.module.css";

const ErrorPage: NextPage = () => (
  <div className={s.pageContainer}>
    <div className={s.content}>
      <span className={classNames(s.descriptionItem, s.title)}>
        Упс! Такая страница не найдена
      </span>
      <div className={s.buttonsContainer}>
        <Link href="/tree">
          <a className={classNames(s.button, s.descriptionItem)}>
            Посмотреть дерево
          </a>
        </Link>
        <Link href="/">
          <a
            className={classNames(
              s.button,
              s.secondaryButton,
              s.descriptionItem
            )}
          >
            Почитать о проекте
          </a>
        </Link>
      </div>
    </div>
    <div className={s.imageContainer}>
      <div className={ballS.ball1} />
      <div className={ballS.ball2} />
      <div className={ballS.ball3} />
      <div className={ballS.ball4} />
      <div className={ballS.ball5} />
    </div>
  </div>
);

export default ErrorPage;
