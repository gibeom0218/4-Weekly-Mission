import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getFolderList } from "@/pages/api/api";
import styles from "@/styles/Add.module.css";
import checkIcon from "@/public/images/check.svg";
import closeIcon from "@/public/images/close.svg";

interface AddProps {
  linkUrl: string;
  onClose: any;
}

interface listType {
  name: string;
  id: number;
  link: {
    count: number;
  };
}

export default function Add({ linkUrl, onClose }: AddProps) {
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // 클릭한 항목의 인덱스를 저장하는 상태 변수

  const clickListItem = (index: any) => {
    setSelectedItem(index); // 클릭한 항목의 인덱스를 상태 변수에 저장
  };

  const click = () => {
    console.log(list);
  };

  useEffect(() => {
    async function getList() {
      try {
        const { data } = await getFolderList();
        setList(data);
      } catch (error) {
        console.error(error);
      }
    }

    getList();
  }, []);

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalAddContainer}>
        <div className={styles.modalTitle}>
          <p id={styles.mainTitle}>폴더에 추가</p>
          <p id={styles.subTitle}>{linkUrl}</p>
        </div>
        <div className={styles.listDivFrame}>
          {list.map(({ name, id, link }: listType, index) => {
            return (
              <div
                className={`${styles.listDiv} ${
                  selectedItem === index ? styles.selected : ""
                }`} // 클릭한 항목인 경우에는 'selected' 클래스를 추가
                key={id}
                onClick={() => clickListItem(index)} // 클릭 이벤트 핸들러 추가
              >
                <div className={styles.listContent}>
                  <span id={styles.name}>{name}</span>
                  <span id={styles.linkCount}>{`${link.count}개 링크`}</span>
                </div>
                {selectedItem === index && (
                  <Image src={checkIcon} alt="checkIcon" />
                )}
              </div>
            );
          })}
        </div>
        <Image
          id={styles.closeIcon}
          src={closeIcon}
          alt="closeIcon"
          onClick={onClose}
        />
        <button onClick={click}>추가하기</button>
      </div>
    </div>
  );
}
