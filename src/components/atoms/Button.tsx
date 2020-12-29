import React, { FC, MouseEvent } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

type ButtonTheme = "default" | "primary";

const getButtonThemeStyle = (theme: ButtonTheme | undefined) => {
  switch (theme) {
    case "primary":
      return styles.primaryButton;
    case "default":
    default:
      return styles.defaultButton;
  }
};

type Props = {
  id?: string;
  name?: string;
  theme?: ButtonTheme;
  className?: string;
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const Button: FC<Props> = ({ id, name, theme, className, disabled, onClick, children }) => {
  const buttonStyle = getButtonThemeStyle(theme);
  return (
    <button id={id} name={name} className={cn(buttonStyle, className)} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
