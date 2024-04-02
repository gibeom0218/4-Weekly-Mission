import React from "react";
import Image from "next/image";
import styles from "@/styles/Edit.module.css";
import closeIcon from "@/public/images/close.svg";

interface EditProps {
  folderName: string;
  onClose: any;
}

export default function Edit({ folderName, onClose }: EditProps) {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <p>폴더 이름 변경</p>
        <Image
          id={styles.closeIcon}
          src={closeIcon}
          alt="closeIcon"
          onClick={onClose}
        />
        <input placeholder={folderName}></input>
        <button>변경하기</button>
      </div>
    </div>
  );
}
