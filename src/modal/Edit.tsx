import React from "react";
import "../modal/Edit.css";
import closeIcon from "../assets/close.svg";

interface EditProps {
  folderName: string;
  onClose: any;
}

export default function Edit({ folderName, onClose }: EditProps) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <p>폴더 이름 변경</p>
        <img id="closeIcon" src={closeIcon} alt="closeIcon" onClick={onClose} />
        <input placeholder={folderName}></input>
        <button>변경하기</button>
      </div>
    </div>
  );
}
