import React from "react";
import Image from "next/image";
import styles from "@/styles/DeleteLink.module.css";
import closeIcon from "@/public/images/close.svg";

interface DeleteLinkProps {
  link: string;
  onClose: any;
}

export default function DeleteFolder({ link, onClose }: DeleteLinkProps) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>
          <p id={styles.mainTitle}>링크 삭제</p>
          <p id={styles.subTitle}>{link}</p>
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
