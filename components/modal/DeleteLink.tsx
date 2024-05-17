import React from "react";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "@/pages/api/api";
import styles from "@/styles/DeleteLink.module.css";
import closeIcon from "@/public/images/close.svg";

interface DeleteLinkProps {
  linkId: number;
  link: string;
  onClose: any;
}

interface LinkData {
  linkId: number;
}

export default function DeleteFolder({
  linkId,
  link,
  onClose,
}: DeleteLinkProps) {
  const queryClient = useQueryClient();
  //const folderId = useQuery({ queryKey: ["folderId"] });
  const folderId = queryClient.getQueryData(["folderId"]);

  const deleteFolderMutation = useMutation<void, Error, LinkData>({
    mutationFn: (linkData) => deleteLink(linkData.linkId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["individualList", folderId],
      });
      queryClient.invalidateQueries({
        queryKey: ["allList"],
      });
      queryClient.invalidateQueries({
        queryKey: ["folderList"],
      });
    },
  });

  const clickDeleteLink = (linkId: number) => {
    if (linkId) {
      const linkData: LinkData = { linkId };
      deleteFolderMutation.mutate(linkData, {
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
          <p id={styles.mainTitle}>링크 삭제</p>
          <p id={styles.subTitle}>{link}</p>
        </div>
        <Image
          id={styles.closeIcon}
          src={closeIcon}
          alt="closeIcon"
          onClick={onClose}
        />
        <button id={styles.deleteBtn} onClick={() => clickDeleteLink(linkId)}>
          삭제하기
        </button>
      </div>
    </div>
  );
}
