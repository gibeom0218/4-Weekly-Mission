import React, { useState } from "react";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFolder } from "@/pages/api/api";
import styles from "@/styles/AddFolder.module.css";
import closeIcon from "@/public/images/close.svg";

interface AddFolderProps {
  onClose: any;
}

interface FolderData {
  name: string;
}

export default function AddFolder({ onClose }: AddFolderProps) {
  const [name, setName] = useState(""); // input 값에 대한 상태
  const queryClient = useQueryClient();

  // input 값이 변경될 때마다 상태 업데이트
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addFolderMutation = useMutation<void, Error, FolderData>({
    mutationFn: (folderData) => addFolder(folderData.name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folderList"],
      });
    },
  });

  const clickChangeName = (name: string) => {
    if (name) {
      const folderData: FolderData = { name };
      addFolderMutation.mutate(folderData, {
        onSuccess: () => {
          console.log("onSuccess in mutate");
        },
      });
    }
  };

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
        <input placeholder="내용입력" onChange={handleInputChange}></input>
        <button
          onClick={() => {
            clickChangeName(name);
          }}
        >
          추가하기
        </button>
      </div>
    </div>
  );
}
