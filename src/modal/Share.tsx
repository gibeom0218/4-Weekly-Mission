import React from "react";
import "../modal/Share.css";
import closeIcon from "../assets/close.svg";
import kakaoIcon from "../assets/kakao.svg";
import facebookIcon from "../assets/facebook_icon.svg";
import linkIcon from "../assets/link.svg";

interface ShareProps {
  folderName: string;
  onClose: any;
}

export default function Share({ folderName, onClose }: ShareProps) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalTitle">
          <p id="mainTitle">폴더 공유</p>
          <p id="subTitle">{folderName}</p>
        </div>
        <img id="closeIcon" src={closeIcon} alt="closeIcon" onClick={onClose} />
        <div className="iconBox">
          <div id="iconBoxFrame">
            <img id="kakaoIcon" src={kakaoIcon} alt="kakaoIcon" />
            <p>카카오톡</p>
          </div>
          <div id="iconBoxFrame">
            <img id="facebookIcon" src={facebookIcon} alt="facebookIcon" />
            <p>페이스북</p>
          </div>
          <div id="iconBoxFrame">
            <img id="linkIcon" src={linkIcon} alt="linkIcon" />
            <p>링크 복사</p>
          </div>
        </div>
      </div>
    </div>
  );
}
