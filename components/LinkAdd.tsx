import React, { useState } from "react";
import Image from "next/image";
import { addLink } from "@/pages/api/api";
import styles from "@/styles/LinkAdd.module.css";
import linkIcon from "@/public/images/link.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface LinkData {
  url: string;
  folderId: {} | undefined;
}

export default function LinkAdd() {
  const [url, setUrl] = useState(""); // input 값에 대한 상태
  const folderId = useQuery({ queryKey: ["folderId"] });

  const queryClient = useQueryClient();

  const addLinkMutation = useMutation<void, Error, LinkData>({
    mutationFn: (linkData) => addLink(linkData.url, Number(linkData.folderId)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["individualList", Number(folderId.data)],
      });
    },
  });

  // input 값이 변경될 때마다 상태 업데이트
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  // 추가하기 버튼 클릭 시 실행되는 함수
  const handleAddClick = (e: any) => {
    e.preventDefault();
    //링크를 추가하는 API 호출 등의 작업 수행
    if (folderId.data !== null) {
      const linkData: LinkData = { url, folderId: folderId.data };
      addLinkMutation.mutate(linkData, {
        onSuccess: () => {
          console.log("onSuccess in mutate");
        },
        onSettled: () => {
          console.log("onSettled in mutate");
        },
      });
    }
  };
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
              value={url} // input 값과 상태를 연결
              onChange={handleInputChange} // input 값 변경 시 호출되는 함수
            />
          </div>
          <button id={styles.addBtn} onClick={handleAddClick}>
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
