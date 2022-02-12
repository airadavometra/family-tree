import { WithClassName } from "@/types/common";
import { FC } from "react";

export const MenuIcon: FC<WithClassName> = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 385 385" xmlSpace="preserve">
      <path d="M12 84.2h361a12 12 0 0 0 0-24H12a12 12 0 0 0 0 24zM373 180.5H12a12 12 0 0 0 0 24h361a12 12 0 0 0 0-24zM373 300.8H12a12 12 0 0 0 0 24h361a12 12 0 0 0 0-24z" />
    </svg>
  );
};
