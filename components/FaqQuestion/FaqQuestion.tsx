import classNames from "classnames";
import { FC, ReactNode, useCallback, useState } from "react";
import s from "./FaqQuestion.module.css";
import Image from "next/image";
import { ExpandIcon } from "@/icons/ExpandIcon";

type FaqQuestionProps = {
  question: string;
  answer: ReactNode;
  isCollapsedByDefault: boolean;
};

const FaqQuestion: FC<FaqQuestionProps> = ({ question, answer, isCollapsedByDefault }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isCollapsedByDefault);

  const toggleIsCollapsed = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  return (
    <div className={s.questionContainer}>
      <div className={s.questionHeader} onClick={toggleIsCollapsed}>
        <div className={s.ball} />
        <span className={s.questionText}>{question}</span>
        <button>
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
      </div>
    </div>
  );
};

export default FaqQuestion;
