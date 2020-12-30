import React, { FC, MouseEvent } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

type ButtonTheme = "default" | "primary";

const style = (theme: ButtonTheme | undefined) => {
  switch (theme) {
    case "primary":
      return styles.primary;
    case "default":
    default:
      return styles.default;
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

export const Button: FC<Props> = ({ id, name, theme, className, disabled, onClick, children }) => (
  <button id={id} name={name} className={cn(style(theme), className)} disabled={disabled} onClick={onClick}>
    {children}
  </button>
);
