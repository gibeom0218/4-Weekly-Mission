import React from "react";
import Image from "next/image";
import styles from "@/styles/AddFolder.module.css";
import closeIcon from "@/public/images/close.svg";

interface AddFolderProps {
  onClose: any;
}

export default function AddFolder({ onClose }: AddFolderProps) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <p>폴더 추가</p>
        <Image
          id={styles.closeIcon}
          src={closeIcon}
          alt="closeIcon"
          onClick={onClose}
        />
        <input placeholder="내용입력"></input>
        <button>추가하기</button>
      </div>
    </div>
  );
}
