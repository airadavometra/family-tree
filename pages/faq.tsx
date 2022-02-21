import Image from "next/image";
import s from "@/styles/Faq.module.css";
import ballS from "@/styles/Ball.module.css";
import classNames from "classnames";
import type { NextPage } from "next";
import BioLink from "@/components/Tree/TreeNodeDetails/BioLink/BioLink";
import FaqQuestion from "@/components/FaqQuestion/FaqQuestion";
import personCard from "../public/personCard.png";
import personCard2 from "../public/personCard2.png";
import tree from "../public/tree.png";
import yellowCircle from "../public/yellowCircle.png";

const questions = [
  {
    question: "Если я есть в дереве, информацию обо мне можно будет найти в Гугл или Яндекс поисковике?",
    answer: (
      <span>
        Нет, дерево не индексируется, поэтому никто не найдет этот сайт, задав в строке поиска ваше ФИО. Но если вам
        беспокойно от того, что ваши данные есть в дереве,{" "}
        <BioLink
          href="https://wa.me/+79853522893?text=Здравствуйте!%20 Пишу%20насчет%20проекта%20ДРЕВО"
          text="напишите нам в WhatsApp"
          newTab={true}
        />{" "}
        - удалим вас из дерева или сократим информацию до комфортного минимума.
      </span>
    ),
  },
  {
    question: "Хочу добавить/удалить/исправить информацию. Как это сделать?",
    answer: (
      <BioLink
        href="https://wa.me/+79853522893?text=Здравствуйте!%20 Пишу%20насчет%20проекта%20ДРЕВО"
        text="Напишите нам в WhatsApp."
        newTab={true}
      />
    ),
  },
  {
    question: "Информация о каких семьях уже есть в проекте?",
    answer: (
      <span>
        На <BioLink href="/families" text="странице Семьи" newTab={true} /> представлен полный список доступных на
        данных момент семей. Каждая фамилия в этом списке - это ссылка, по которой можно перейти и посмотреть дерево
        этой семьи. Некоторые деревья большие, некоторые - еще маленькие. Если вдруг вы желаете помочь нам и дополнить
        дерево,{" "}
        <BioLink
          href="https://wa.me/+79853522893?text=Здравствуйте!%20 Пишу%20насчет%20проекта%20ДРЕВО"
          text="напишите нам в WhatsApp"
          newTab={true}
        />
        .
      </span>
    ),
  },
  {
    question: "Что я вижу на странице Дерево?",
    answer: (
      <span>
        На <BioLink href="/tree" text="странице Дерево" newTab={true} /> можно посмотреть информацию о представителях
        той или иной семьи и виде дерева. Дерево состоит из узлов в виде шариков, каждый узел - это отдельный человек.
        Дерево строится сверху вниз, то есть старшие поколения расположены выше. Дети расположены слева направо - от
        старшего к младшему.
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={tree} layout="responsive" />
        </div>
        <br />
        По умолчанию показано дерево семьи Артемовых, но там также можно посмотреть деревья и для других семей. На{" "}
        <BioLink href="/families" text="странице Семьи" newTab={true} /> можно посмотреть список ссылок на деревья
        других семей. А на карточке с подробной информацией о человеке есть вкладка Семья со списком тех семей, потомком
        которых является этот человек.
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={personCard2} layout="responsive" />
        </div>
      </span>
    ),
  },
  {
    question: "Что я могу узнать о конкретном человеке? Где это посмотреть?",
    answer: (
      <span>
        На <BioLink href="/tree" text="странице Дерево" newTab={true} /> можно посмотреть дерево семьи. Дерево состоит
        из узлов в виде шариков. На каждом шарике отображается ФИО человека и его годы жизни, если они нам известны.
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={tree} layout="responsive" />
        </div>
        <br />
        Также по клику на шарик открывается карточка с подробной информацией о человеке, где вы можете видеть 3 вкладки:
        Биография, Галерея и Семьи.
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={personCard} layout="responsive" />
        </div>
        <br />
        На вкладке Биография может быть информация о дате и месте рождения, дате и месте смерти, ближайших родственниках
        человека (родители, супруги, дети, братья и сестры). Также там можно найти информацию о национальности,
        образовании, профессии и наградах человека и его краткую биографию. К сожалению, мы не обладаем такой
        информацией о всех людях в дереве, поэтому если вы желаете помочь и добавить что-то, напишите нам в WhatsApp
        (ссылка).
        <br />
        <br />
        На вкладке Галерея можно посмотреть фотографии этого человека.
        <br />
        <br />
        На вкладке Семьи можно увидеть список семей, потомком которых является этот человек. Каждая фамилия там - это
        ссылка на дерево этой семьи.
      </span>
    ),
  },
  {
    question: "Почему некоторые шарики имеют желтое кольцо?",
    answer: (
      <span>
        Так мы отмечаем людей, чьи родители не отображаются в просматриваемом дереве. Мы специально не показываем
        всех-всех в одном дереве, потому что такое дерево сложно не только построить, но и читать…
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={yellowCircle} layout="responsive" />
        </div>
        <br />
        Но вы можете открыть карточку человека с таким шариком, перейти на вкладку Семьи и увидеть, потомком каких семей
        он является. Каждая фамилия там - это ссылка на дерево этой семьи.
        <br />
        <br />
        <div className={s.pictureWrapper}>
          <Image src={personCard2} layout="responsive" />
        </div>
      </span>
    ),
  },
  {
    question: "Я могу поделиться ссылкой на конкретное дерево?",
    answer: (
      <span>
        Конечно! По умолчанию всегда открывается дерево семьи Артемовых, но если вы откроете дерево другой семьи и
        скопируете ссылку из строки браузера, то эта ссылка всегда будет вести на это дерево.
      </span>
    ),
  },
];

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
      <div className={s.questionsContainer}>
        {questions.map((item, index) => (
          <FaqQuestion key={index} question={item.question} answer={item.answer} isCollapsedByDefault={index > 0} />
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

export default FaqPage;
