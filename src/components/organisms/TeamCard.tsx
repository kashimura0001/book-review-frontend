import React, { FC } from "react";
import styles from "./TeamCard.module.scss";

type Props = {
  name: string;
  memberCount: number;
  onClick: () => void;
};

export const TeamCard: FC<Props> = ({ name, memberCount, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.name}>{name}</div>
      <div className={styles.memberCount}>メンバー： {memberCount}人</div>
    </div>
  );
};
