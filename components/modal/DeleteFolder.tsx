import React from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFolder } from "@/pages/api/api";
import styles from "@/styles/DeleteFolder.module.css";
import closeIcon from "@/public/images/close.svg";

interface DeleteFolderProps {
  folderId: number | null;
  folderName: string | undefined;
  onClose: any;
}

interface FolderData {
  folderId: number;
}

export default function DeleteFolder({
  folderId,
  folderName,
  onClose,
}: DeleteFolderProps) {
  const queryClient = useQueryClient();

  const deleteFolderMutation = useMutation<void, Error, FolderData>({
    mutationFn: (folderData) => deleteFolder(folderData.folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folderList"],
      });
    },
  });

  const clickChangeName = (folderId: number | null) => {
    if (folderId) {
      const folderData: FolderData = { folderId };
      deleteFolderMutation.mutate(folderData, {
        onSuccess: () => {
          console.log("onSuccess in mutate");
        },
      });
    }
  };

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
        <button id={styles.deleteBtn} onClick={() => clickChangeName(folderId)}>
          삭제하기
        </button>
      </div>
    </div>
  );
}
