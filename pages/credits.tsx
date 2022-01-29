import classNames from "classnames";
import type { NextPage } from "next";
import Image from "next/image";
import Credit from "../components/Credit/Credit";
import { getNodesCount, getTreeDepth } from "../components/Widget/utils";
import ballS from "../styles/Ball.module.css";
import s from "../styles/CreditsPage.module.css";

const credits = [
  { name: "Каршкову Максиму", description: "за кропотливый сбор информации" },
  { name: "Крученкову Виктору", description: "за кропотливый сбор информации" },
  { name: "Иванову Владимиру", description: "за разработку сайта" },
  { name: "Артемовой Дарье", description: "за разработку сайта" },
  {
    name: "Артемову Сергею",
    description: "за структуризацию информации для сайта",
  },
];

const CreditsPage: NextPage = () => {
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
            <span className={s.logoTitle}>БЛАГОДАРНОСТИ</span>
          </div>
          {credits.map((item, index) => (
            <Credit
              key={index}
              name={item.name}
              description={item.description}
            />
          ))}
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

export default CreditsPage;
