import React from "react";
import Image from "next/image";
import styles from "@/styles/LinkAdd.module.css";
import linkIcon from "@/public/images/link.svg";

export default function LinkAdd() {
  return (
    <div className={styles.LinkAdd}>
      <div className={styles.LinkAddBar_Frame}>
        <div className={styles.LinkAddBar}>
          <div className={styles.LinkAddBar_Element}>
            <Image id={styles.linkIcon} src={linkIcon} alt="링크 아이콘" />
            <input
              type="text"
              id={styles.inputText}
              placeholder="링크를 추가해보세요."
            />
          </div>
          <button id={styles.addBtn}>추가하기</button>
        </div>
      </div>
    </div>
  );
}
