import React from "react";
import "../modal/AddFolder.css";
import closeIcon from "../assets/close.svg";

interface AddFolderProps {
  onClose: any;
}

export default function AddFolder({ onClose }: AddFolderProps) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <p>폴더 추가</p>
        <img src={closeIcon} alt="closeIcon" onClick={onClose} />
        <input placeholder="내용입력"></input>
        <button>추가하기</button>
      </div>
    </div>
  );
}
