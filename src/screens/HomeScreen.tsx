import React from "react";
import styles from "./HomeScreen.module.scss";
import { Button } from "../components/atoms/Button";
import { TeamCard } from "../components/organisms/TeamCard";

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
  return (
    <div className={styles.container}>
      <div className={styles.contentAll}>
        <div className={styles.header}>
          <div className={styles.title}>チームリスト</div>
          <Button theme="primary" onClick={() => null}>
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
  );
};
