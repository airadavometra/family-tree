import FamilyLink from "@/components/FamilyLink/FamilyLink";
import { getFamiliesArray } from "@/data";
import ballS from "@/styles/Ball.module.css";
import s from "@/styles/FamiliesPage.module.css";
import classNames from "classnames";
import type { NextPage } from "next";
import Image from "next/image";

const FamiliesPage: NextPage = () => {
  const familiesMap = getFamiliesArray();

  return (
    <div className={s.pageContainer}>
      <div className={s.content}>
        <div className={s.descriptionContainer}>
          <div className={classNames(s.titleContainer, s.descriptionItem)}>
            <div className={s.logoContainer}>
              <Image src="/LogoBig.png" width={120} height={110} alt="Логотип проекта древо" />
            </div>
            <span className={s.logoTitle}>СЕМЬИ В ПРОЕКТЕ</span>
          </div>
        </div>
        <div className={s.familiesContainer}>
          {familiesMap
            .filter((family) => !family.lastName.startsWith("от ("))
            .map((family, index) => (
              <FamilyLink key={index} href={`/tree?root=${family.id}`} familyName={family.lastName} />
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

export default FamiliesPage;
