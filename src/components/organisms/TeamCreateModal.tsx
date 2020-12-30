import React, { FC } from "react";
import styles from "./TeamCreateModal.module.scss";
import { Modal } from "../atoms/Modal";
import { Button } from "../atoms/Button";
import { BoldText } from "../atoms/Text";
import { TextBox } from "../atoms/TextBox";

type Props = {
  onCancel: () => void;
};

export const TeamCreateModal: FC<Props> = ({ onCancel }) => {
  return (
    <Modal onOutsideClick={onCancel}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <BoldText>チームを作成する</BoldText>
        </div>
        <div className={styles.body}>
          <TextBox placeholder="チーム名を入力してください..." />
        </div>
        <div className={styles.buttons}>
          <Button className={styles.button} onClick={onCancel}>キャンセル</Button>
          <Button className={styles.button} theme="primary" onClick={() => null}>
            作成する
          </Button>
        </div>
      </div>
    </Modal>
  );
};
