import React, { useState } from "react";
import DeleteLink from "../modal/DeleteLink";
import Add from "../modal/Add";
import "./CardList.css";
import star_icon from "../assets/star.svg";
import kebab_icon from "../assets/kebab.svg";

interface CardListProps {
  url: string;
  createdAt: string;
  desc: string;
  imgUrl: string;
}

export default function CardList({
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
    <div className="CardList">
      {isDeleteLinkModal && <DeleteLink link={url} onClose={clickDeleteLink} />}
      {isAddModal && <Add onClose={clickAdd} />}
      <img
        id="cardImg"
        src={imgUrl}
        alt="카드 리스트별 이미지"
        onClick={linkUrl}
      />
      <img id="starIcon" src={star_icon} alt="별 모양 버튼" />
      <div id="textarea">
        <div id="timeAgoFrame">
          <span id="timeOut">{timeAgo(createdAt)}</span>
          <img
            id="kebabIcon"
            src={kebab_icon}
            alt="케밥 버튼"
            onClick={clickKebab}
          />
        </div>
        <p id="description">{desc}</p>
        <p id="createdAt">{formattedDate}</p>
        {isPopOver && (
          <div className="popOver">
            <div id="popOverDel" onClick={clickDeleteLink}>
              삭제하기
            </div>
            <div id="popOverAdd" onClick={clickAdd}>
              폴더에 추가
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
