import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "./FullScreenMenu.module.css";
import classNames from "classnames";
import { CloseIcon } from "../../icons/CloseIcon";
import { Navigation } from "../Header/Header";

type FullScreenMenuProps = {
  isOpen: boolean;
  navigation: Navigation[];
  onMenuItemClick: (path: string) => void;
  onCloseMenu: () => void;
  selectedMenuItemId: number;
};

const FullScreenMenu: FC<FullScreenMenuProps> = ({
  isOpen,
  navigation,
  selectedMenuItemId,
  onCloseMenu,
  onMenuItemClick,
}) => {
  const router = useRouter();
  return (
    <div
      className={classNames(s.menuContainer, {
        [s.closedMenu]: !isOpen,
      })}
    >
      <button onClick={onCloseMenu}>
        <CloseIcon className={s.closeIcon} />
      </button>
      <nav className={s.menu}>
        {navigation.map(({ id, title, path }) => (
          <button
            key={id}
            onClick={() => onMenuItemClick(path)}
            className={classNames(s.link, {
              [s.selected]: selectedMenuItemId === id,
            })}
          >
            {title}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default FullScreenMenu;
