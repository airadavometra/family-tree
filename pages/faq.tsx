import Image from "next/image";
import s from "@/styles/Faq.module.css";
import ballS from "@/styles/Ball.module.css";
import classNames from "classnames";
import type { NextPage } from "next";
import BioLink from "@/components/Tree/TreeNodeDetails/BioLink/BioLink";

const FaqPage: NextPage = () => (
  <div className={s.pageContainer}>
    <div className={s.content}>
      <div className={s.descriptionContainer}>
        <div className={classNames(s.titleContainer, s.descriptionItem)}>
          <div className={s.logoContainer}>
            <Image src="/LogoBig.png" width={120} height={110} alt="Логотип проекта древо" />
          </div>
          <span className={s.logoTitle}>FAQ</span>
        </div>
        <div className={classNames(s.subtitleContainer, s.descriptionItem)}>
          <span>
            Не нашли ответ на свой вопрос?{" "}
            <BioLink
              href="https://wa.me/+79853522893?text=Здравствуйте!%20 Пишу%20насчет%20проекта%20ДРЕВО"
              text="Напишите нам в WhatsApp!"
              newTab={true}
            />{" "}
            Мы будем рады помочь, а также получить ценную обратную связь, чтобы сделать сайт удобнее и понятнее.
          </span>
        </div>
      </div>
      <div className={s.questionsContainer}></div>
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

export default FaqPage;
