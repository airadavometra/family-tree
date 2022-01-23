import classNames from "classnames";
import type { NextPage } from "next";
import Image from "next/image";
import Button from "../components/Button/Button";
import { getNodesCount, getTreeDepth } from "../components/Widget/utils";
import Widget from "../components/Widget/Widget";
import ballS from "../styles/Ball.module.css";
import s from "../styles/HomePage.module.css";

const HomePage: NextPage = () => {
  const nodesCount = getNodesCount();
  const treeDepth = getTreeDepth();

  return (
    <div className={s.pageContainer}>
      <div className={s.content}>
        <div className={s.descriptionContainer}>
          <div className={classNames(s.logoContainer, s.descriptionItem)}>
            <Image
              src="/LogoBig.png"
              width={120}
              height={110}
              alt="Логотип проекта древо"
            />
            <span className={s.logoTitle}>ДРЕВО</span>
          </div>
          <span className={classNames(s.description, s.descriptionItem)}>
            ДРЕВО – это открытый групповой проект по восстановлению
            генеалогических связей и сборе информации о происхождении семьи
            Артемовых и родстве с другими семьями.
          </span>
          <span className={classNames(s.description, s.descriptionItem)}>
            Результатом детективно-архивных исследований многих людей является
            масштабное генеалогическое дерево, уходящее корнями в 19 век.
          </span>
          <span className={classNames(s.description, s.descriptionItem)}>
            Если вы обладаете информацией или материалами и желаете дополнить
            проект, пожалуйста, свяжитесь с нами в телеграме.
          </span>
          <div className={s.buttonsContainer}>
            <Button
              href="/tree"
              text="Посмотреть дерево"
              className={s.descriptionItem}
            />
            <Button
              href="https://t.me/airadavometra"
              text="Написать в телеграме"
              className={s.descriptionItem}
              isSecondary={true}
              newTab={true}
            />
          </div>
        </div>
        <div className={s.widgets}>
          <Widget
            title="Всего человек в дереве"
            value={nodesCount.toString()}
          />
          <Widget
            title="Максимальная глубина дерева"
            value={treeDepth.toString()}
          />
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
};

export default HomePage;
