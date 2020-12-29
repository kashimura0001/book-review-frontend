import React, { FC } from "react";
import styles from "./TeamCard.module.scss";
import { NormalText, BoldText } from "../atoms/Text";

type Props = {
  name: string;
  memberCount: number;
  onClick: () => void;
};

export const TeamCard: FC<Props> = ({ name, memberCount, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <BoldText className={styles.name}>{name}</BoldText>
      <div className={styles.memberCountWrapper}>
        <NormalText>メンバー： {memberCount}人</NormalText>
      </div>
    </div>
  );
};
