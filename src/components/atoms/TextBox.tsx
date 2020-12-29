import React, { ChangeEvent, MouseEvent, FocusEvent, FC } from "react";
import cn from "classnames";
import styles from "./TextBox.module.scss";

type Props = {
  id?: string;
  name?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
};

export const TextBox: FC<Props> = ({
  id,
  name,
  type = "text",
  className,
  placeholder,
  value,
  disabled,
  onClick,
  onChange,
  onFocus,
}) => (
  <input
    id={id}
    name={name}
    type={type}
    className={cn(styles.textBox, className)}
    placeholder={placeholder}
    value={value}
    disabled={disabled}
    onClick={onClick}
    onChange={onChange}
    onFocus={onFocus}
  />
);
