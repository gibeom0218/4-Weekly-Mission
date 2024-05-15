import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/Share.module.css";
import closeIcon from "@/public/images/close.svg";
import kakaoIcon from "@/public/images/kakao.svg";
import facebookIcon from "@/public/images/facebook_icon.svg";
import linkIcon from "@/public/images/link.svg";

interface ShareProps {
  folderId: number | null;
  folderName: string | undefined;
  onClose: any;
}

export default function Share({ folderId, folderName, onClose }: ShareProps) {
  const router = useRouter();

  const moveToSharePage = (id: number | null) => {
    if (id !== null) {
      router.push(`/shared/${id}`);
    }
  };

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
            <Image
              id={styles.kakaoIcon}
              src={kakaoIcon}
              onClick={() => moveToSharePage(folderId)}
              alt="kakaoIcon"
            />
            <p>공유페이지</p>
          </div>
          <div id={styles.iconBoxFrame}>
            <Image
              id={styles.facebookIcon}
              src={facebookIcon}
              onClick={() => moveToSharePage(folderId)}
              alt="facebookIcon"
            />
            <p>공유페이지</p>
          </div>
          <div id={styles.iconBoxFrame}>
            <Image
              id={styles.linkIcon}
              src={linkIcon}
              onClick={() => moveToSharePage(folderId)}
              alt="linkIcon"
            />
            <p>공유페이지</p>
          </div>
        </div>
      </div>
    </div>
  );
}
