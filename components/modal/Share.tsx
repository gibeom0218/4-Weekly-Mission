import React from "react";
import Image from "next/image";
import styles from "@/styles/Share.module.css";
import closeIcon from "@/public/images/close.svg";
import kakaoIcon from "@/public/images/kakao.svg";
import facebookIcon from "@/public/images/facebook_icon.svg";
import linkIcon from "@/public/images/link.svg";

interface ShareProps {
  folderName: string;
  onClose: any;
}

export default function Share({ folderName, onClose }: ShareProps) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          <p id={styles.mainTitle}>폴더 공유</p>
          <p id={styles.subTitle}>{folderName}</p>
        </div>
        <Image
          id={styles.closeIcon}
          src={closeIcon}
          alt="closeIcon"
          onClick={onClose}
        />
        <div className={styles.iconBox}>
          <div id={styles.iconBoxFrame}>
            <Image id={styles.kakaoIcon} src={kakaoIcon} alt="kakaoIcon" />
            <p>카카오톡</p>
          </div>
          <div id={styles.iconBoxFrame}>
            <Image
              id={styles.facebookIcon}
              src={facebookIcon}
              alt="facebookIcon"
            />
            <p>페이스북</p>
          </div>
          <div id={styles.iconBoxFrame}>
            <Image id={styles.linkIcon} src={linkIcon} alt="linkIcon" />
            <p>링크 복사</p>
          </div>
        </div>
      </div>
    </div>
  );
}
