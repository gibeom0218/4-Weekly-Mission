import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFolder, getFolderUser } from "@/pages/api/api";
import styles from "@/styles/FolderBar.module.css";

export default function FolderBar({ id }: any) {
  //폴더 이름을 가져오기 위한 쿼리
  const folderInfo = useQuery({
    queryKey: ["folderInfo"],
    queryFn: async () => await getFolder(id),
  });

  //폴더 소유자를 가져오기 위한 쿼리
  const folderOwner = useQuery({
    queryKey: ["folderOwner"],
    queryFn: async () => await getFolderUser(folderInfo.data[0].user_id),
  });

  return (
    <div className={styles.FolderBar}>
      <div className={styles.user}>
        <img
          id={styles.folderImg}
          src={folderOwner.data && folderOwner.data[0]?.image_source}
          alt="폴더 이미지"
        ></img>
        <span id={styles.userName}>
          @{folderOwner.data && folderOwner.data[0]?.name}
        </span>
        <span id={styles.folderName}>
          {folderInfo.data && folderInfo.data[0]?.name}
        </span>
      </div>
    </div>
  );
}
