import React from "react";
import Image from "next/image";
import styles from "@/styles/DeleteFolder.module.css";
import closeIcon from "@/public/images/close.svg";

interface DeleteFolderProps {
  folderName: string | undefined;
  onClose: any;
}

export default function DeleteFolder({
  folderName,
  onClose,
}: DeleteFolderProps) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          <p id={styles.mainTitle}>폴더 삭제</p>
          <p id={styles.subTitle}>{folderName}</p>
        </div>
        <Image
          id={styles.closeIcon}
          src={closeIcon}
          alt="closeIcon"
          onClick={onClose}
        />
        <button id={styles.deleteBtn}>삭제하기</button>
      </div>
    </div>
  );
}
