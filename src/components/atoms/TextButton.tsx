import React, { MouseEvent, FC } from "react";
import styles from "./TextButton.module.scss";
import cn from "classnames";

type TextButtonTheme = "default" | "primary";

const getTextButtonThemeStyle = (theme: TextButtonTheme | undefined) => {
  switch (theme) {
    case "primary":
      return styles.primaryTextButton;
    case "default":
    default:
      return styles.defaultTextButton;
  }
};

type Props = {
  id?: string;
  name?: string;
  theme?: TextButtonTheme;
  className?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const TextButton: FC<Props> = ({ id, name, theme, className, onClick, children }) => {
  const textButtonTheme = getTextButtonThemeStyle(theme);
  return (
    <button id={id} name={name} className={cn(textButtonTheme, className)} onClick={onClick}>
      {children}
    </button>
  );
};
