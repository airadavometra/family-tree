import classNames from "classnames";
import { FC, ReactNode, useCallback, useState } from "react";
import s from "./FaqQuestion.module.css";
import Image from "next/image";
import { ExpandIcon } from "@/icons/ExpandIcon";

type FaqQuestionProps = {
  question: string;
  answer: ReactNode;
  pictures: string[];
  isCollapsedByDefault: boolean;
};

const FaqQuestion: FC<FaqQuestionProps> = ({ question, answer, pictures, isCollapsedByDefault }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isCollapsedByDefault);

  const toggleIsCollapsed = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  return (
    <div className={s.questionContainer}>
      <div className={s.questionHeader}>
        <div className={s.ball} />
        <span className={s.questionText}>{question}</span>
        <button onClick={toggleIsCollapsed}>
          <ExpandIcon
            className={classNames(s.expandBtn, {
              [s.isExpanded]: !isCollapsed,
            })}
          />
        </button>
      </div>
      <div
        className={classNames(s.answerContainer, {
          [s.collapsed]: isCollapsed,
        })}
      >
        {answer}
        <div className={s.picturesContainer}>
          {pictures.map((picture) => (
            <Image src={picture} width={120} height={110} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqQuestion;
