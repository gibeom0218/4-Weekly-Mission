import React from "react";
import { useEffect, useState } from "react";
import { getFolder } from "@/pages/api/api";
import styles from "@/styles/FolderBar.module.css";

export default function FolderBar() {
  const [folderName, setFolderName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");

  useEffect(() => {
    async function getProFileFolder() {
      try {
        const {
          folder: { name, owner },
        } = await getFolder();
        setFolderName(name);
        setUserName(owner.name);
        setProfileImage(owner.profileImageSource);
      } catch (error) {
        console.error(error);
      }
    }

    getProFileFolder();
  }, []);
  return (
    <div className={styles.FolderBar}>
      <div className={styles.user}>
        <img id={styles.folderImg} src={profileImage} alt="폴더 이미지"></img>
        <span id={styles.userName}>@{userName}</span>
        <span id={styles.folderName}>{folderName}</span>
      </div>
    </div>
  );
}
