import React, { FC } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

type ButtonTheme = "default" | "primary";

const getButtonThemeStyle = (theme: ButtonTheme | undefined) => {
  switch (theme) {
    case "primary":
      return styles.primary;
    case "default":
    default:
      return styles.white;
  }
};

type Props = {
  theme?: ButtonTheme;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
};

export const Button: FC<Props> = ({ theme, className, disabled, onClick, children }) => {
  const buttonStyle = getButtonThemeStyle(theme);
  return (
    <button onClick={onClick} className={cn(buttonStyle, className)} disabled={disabled}>
      {children}
    </button>
  );
};
