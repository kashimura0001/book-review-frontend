import React, { useState } from "react";
import styles from "./HomeScreen.module.scss";
import { Button } from "../components/atoms/Button";
import { TeamCard } from "../components/organisms/TeamCard";
import { TeamCreateModal } from "../components/organisms/TeamCreateModal";
import { BoldText } from "../components/atoms/Text";

// TODO あとで消す
const teams = [
  {
    name: "リフカム",
    membersCount: 23,
  },
  {
    name: "リフカム",
    membersCount: 23,
  },
  {
    name: "リフカム",
    membersCount: 23,
  },
  {
    name: "リフカム",
    membersCount: 23,
  },
];

export const HomeScreen = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentAll}>
          <div className={styles.header}>
            <BoldText className={styles.title}>チームリスト</BoldText>
            <Button theme="primary" onClick={openModal}>
              チーム作成する
            </Button>
          </div>
          <div className={styles.teams}>
            {teams.map((team, index) => {
              return (
                <div className={styles.teamCard}>
                  <TeamCard name={team.name} memberCount={team.membersCount} onClick={() => null} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {isOpenModal && <TeamCreateModal onCancel={closeModal} />}
    </>
  );
};
