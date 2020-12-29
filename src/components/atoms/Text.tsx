import React, { FC } from "react";
import cn from "classnames";
import styles from "./Text.module.scss";

type Props = {
  id?: string;
  className?: string;
};

export const LighterText: FC<Props> = ({ id, className, children }) => (
  <span id={id} className={cn(styles.lighterText, className)}>
    {children}
  </span>
);

export const NormalText: FC<Props> = ({ id, className, children }) => (
  <span id={id} className={cn(styles.normalText, className)}>
    {children}
  </span>
);

export const BoldText: FC<Props> = ({ id, className, children }) => (
  <span id={id} className={cn(styles.boldText, className)}>
    {children}
  </span>
);
