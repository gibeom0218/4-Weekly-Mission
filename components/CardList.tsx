import React, { useState } from "react";
import Image from "next/image";
import DeleteLink from "@/components/modal/DeleteLink";
import Add from "@/components/modal/Add";
import styles from "@/styles/CardList.module.css";
import star_icon from "@/public/images/star.svg";
import kebab_icon from "@/public/images/kebab.svg";

interface CardListProps {
  linkId: number;
  url: string;
  createdAt: string;
  desc: string;
  imgUrl: string;
}

export default function CardList({
  linkId,
  url,
  createdAt,
  desc,
  imgUrl,
}: CardListProps) {
  const [isPopOver, setIsPopOver] = useState(false);
  const [isDeleteLinkModal, setIsDeleteLinkModal] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);

  const clickKebab = () => {
    setIsPopOver(!isPopOver);
  };

  const clickDeleteLink = () => {
    setIsDeleteLinkModal(!isDeleteLinkModal);
  };

  const clickAdd = () => {
    setIsAddModal(!isAddModal);
  };

  const linkUrl = () => {
    window.open(url);
  };

  const formattedDate = new Date(createdAt)
    .toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, ". ");

  const timeAgo = (createdAt: string) => {
    const currentTime = new Date();
    const createdTime = new Date(createdAt);
    const timeDiff = Math.abs(currentTime.getTime() - createdTime.getTime());
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = month * 12;

    if (timeDiff < minute * 2) {
      return "1 minute ago";
    } else if (timeDiff < hour) {
      return Math.floor(timeDiff / minute) + " minutes ago";
    } else if (timeDiff < day) {
      return Math.floor(timeDiff / hour) + " hours ago";
    } else if (timeDiff < month) {
      return Math.floor(timeDiff / day) + " days ago";
    } else if (timeDiff < year) {
      return Math.floor(timeDiff / month) + " months ago";
    } else {
      return Math.floor(timeDiff / year) + " years ago";
    }
  };

  return (
    <div className={styles.CardList}>
      {isDeleteLinkModal && (
        <DeleteLink linkId={linkId} link={url} onClose={clickDeleteLink} />
      )}
      {isAddModal && <Add linkUrl={url} onClose={clickAdd} />}
      <img
        id={styles.cardImg}
        src={imgUrl}
        alt="카드 리스트별 이미지"
        onClick={linkUrl}
      />
      <Image id={styles.starIcon} src={star_icon} alt="별 모양 버튼" />
      <div id={styles.textarea}>
        <div id={styles.timeAgoFrame}>
          <span id={styles.timeOut}>{timeAgo(createdAt)}</span>
          <Image
            id={styles.kebabIcon}
            src={kebab_icon}
            alt="케밥 버튼"
            onClick={clickKebab}
          />
        </div>
        <p id={styles.description}>{desc}</p>
        <p id={styles.createdAt}>{formattedDate}</p>
        {isPopOver && (
          <div className={styles.popOver}>
            <div id={styles.popOverDel} onClick={clickDeleteLink}>
              삭제하기
            </div>
            <div id={styles.popOverAdd} onClick={clickAdd}>
              폴더에 추가
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
