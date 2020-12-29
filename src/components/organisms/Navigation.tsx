import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../common/provider/AuthProvider";
import { Button } from "../atoms/Button";
import { TextButton } from "../atoms/TextButton";
import { HomePath, ProfilePath } from "../../routes";
import styles from "./Navigation.module.scss";
import { BoldText } from "../atoms/Text";

const isHideNavigationButtonsPath = (pathName: string) => {
  return [HomePath, ProfilePath].includes(pathName);
};

export const Navigation = () => {
  const { user, signOut } = useAuth();
  const { pathname } = useLocation();
  const isShowNavigationButtons = !isHideNavigationButtonsPath(pathname);

  const sendEmailVerification = () => {
    user
      ?.sendEmailVerification()
      .then(() => {
        alert("送信しました");
      })
      .catch((error) => {
        console.log(error);
        alert("送信に失敗しました");
      });
  };

  return (
    <>
      <div className={styles.header}>
        <BoldText className={styles.logo}>Bukure</BoldText>
        {isShowNavigationButtons && (
          <>
            <TextButton className={styles.navigationItem} onClick={() => null}>
              タイムライン
            </TextButton>
            <TextButton className={styles.navigationItem} onClick={() => null}>
              メンバー
            </TextButton>
          </>
        )}
        <div className={styles.navigationActions}>
          {isShowNavigationButtons && (
            <Button theme="primary" className={styles.createReviewButton} onClick={() => null}>
              レビューを書く
            </Button>
          )}
          {/* TODO あとで削除する */}
          <button onClick={async () => console.log(await user?.getIdToken(true))}>Get auth token　　</button>
          {/* TODO あとでアイコンに変更する */}
          <button onClick={signOut}>サインアウト</button>
        </div>
      </div>

      {!user?.emailVerified && (
        <div className={styles.noticeBar}>
          {`${user?.email}宛に認証メールを送信しました。`}
          <TextButton theme="primary" onClick={sendEmailVerification}>
            再送する
          </TextButton>
        </div>
      )}
    </>
  );
};
