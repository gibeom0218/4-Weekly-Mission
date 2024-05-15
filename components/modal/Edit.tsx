import React, { useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeName } from "@/pages/api/api";
import styles from "@/styles/Edit.module.css";
import closeIcon from "@/public/images/close.svg";

interface EditProps {
  folderId: number | null;
  folderName: string;
  onClose: any;
}

interface FolderData {
  name: string;
  folderId: number;
}

export default function Edit({ folderId, folderName, onClose }: EditProps) {
  const [name, setName] = useState(""); // input 값에 대한 상태
  const queryClient = useQueryClient();

  // input 값이 변경될 때마다 상태 업데이트
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const changeFolderNameMutation = useMutation<void, Error, FolderData>({
    mutationFn: (folderData) =>
      changeName(folderData.name, folderData.folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folderList"],
      });
    },
  });

  const clickChangeName = (name: string, folderId: number | null) => {
    if (folderId) {
      const folderData: FolderData = { name, folderId };
      changeFolderNameMutation.mutate(folderData, {
        onSuccess: () => {
          console.log("onSuccess in mutate");
        },
      });
    }
  };

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
        <input
          placeholder={folderName}
          value={name}
          onChange={handleInputChange}
        ></input>
        <button onClick={() => clickChangeName(name, folderId)}>
          변경하기
        </button>
      </div>
    </div>
  );
}
