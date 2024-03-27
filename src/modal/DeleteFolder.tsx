import React from "react";
import "../modal/DeleteFolder.css";
import closeIcon from "../assets/close.svg";

interface DeleteFolderProps {
  folderName: string;
  onClose: any;
}

export default function DeleteFolder({
  folderName,
  onClose,
}: DeleteFolderProps) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalTitle">
          <p id="mainTitle">폴더 삭제</p>
          <p id="subTitle">{folderName}</p>
        </div>
        <img id="closeIcon" src={closeIcon} alt="closeIcon" onClick={onClose} />
        <button id="deleteBtn">삭제하기</button>
      </div>
    </div>
  );
}
