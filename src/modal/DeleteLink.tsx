import React from "react";
import "../modal/DeleteLink.css";
import closeIcon from "../assets/close.svg";

interface DeleteLinkProps {
  link: string;
  onClose: any;
}

export default function DeleteFolder({ link, onClose }: DeleteLinkProps) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalTitle">
          <p id="mainTitle">링크 삭제</p>
          <p id="subTitle">{link}</p>
        </div>
        <img id="closeIcon" src={closeIcon} alt="closeIcon" onClick={onClose} />
        <button id="deleteBtn">삭제하기</button>
      </div>
    </div>
  );
}
