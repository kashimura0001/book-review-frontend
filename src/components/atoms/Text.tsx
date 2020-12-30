import React, { FC } from "react";
import cn from "classnames";
import styles from "./Text.module.scss";

type TextThemeType = "default" | "primary" | "danger";

const color = (theme: TextThemeType | undefined) => {
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
  theme?: TextThemeType;
  className?: string;
};

export const LighterText: FC<Props> = ({ id, theme, className, children }) => (
  <span id={id} className={cn(styles.lighterText, color(theme), className)}>
    {children}
  </span>
);

export const NormalText: FC<Props> = ({ id, theme, className, children }) => (
  <span id={id} className={cn(styles.normalText, color(theme), className)}>
    {children}
  </span>
);

export const BoldText: FC<Props> = ({ id, theme, className, children }) => (
  <span id={id} className={cn(styles.boldText, color(theme), className)}>
    {children}
  </span>
);
