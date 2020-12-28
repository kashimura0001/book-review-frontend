import React, { FC } from "react";
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
  theme?: TextButtonTheme;
  className?: string;
  onClick: () => void;
};

export const TextButton: FC<Props> = ({ theme, className, children }) => {
  const textButtonTheme = getTextButtonThemeStyle(theme);
  return <button className={cn(textButtonTheme, className)}>{children}</button>;
};
