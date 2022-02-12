import { WithClassName } from "@/types/common";
import { FC } from "react";

export const CloseIcon: FC<WithClassName> = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M5 4a1 1 0 0 0-.7 1.7l6.3 6.3-6.3 6.3a1 1 0 1 0 1.4 1.4l6.3-6.3 6.3 6.3a1 1 0 1 0 1.4-1.4L13.4 12l6.3-6.3A1 1 0 0 0 19 4a1 1 0 0 0-.7.3L12 10.6 5.7 4.3A1 1 0 0 0 5 4z" />
    </svg>
  );
};
