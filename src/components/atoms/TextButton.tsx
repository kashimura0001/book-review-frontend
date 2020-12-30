import React, { MouseEvent, FC } from "react";
import styles from "./TextButton.module.scss";
import cn from "classnames";

type TextButtonTheme = "default" | "primary" | "danger";

const style = (theme: TextButtonTheme | undefined) => {
  switch (theme) {
    case "primary":
      return styles.primary;
    case "danger":
      return styles.danger;
    case "default":
    default:
      return styles.default;
  }
};

type Props = {
  id?: string;
  name?: string;
  theme?: TextButtonTheme;
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const TextButton: FC<Props> = ({ id, name, theme, className, onClick, children }) => (
  <button id={id} name={name} className={cn(style(theme), className)} onClick={onClick}>
    {children}
  </button>
);
