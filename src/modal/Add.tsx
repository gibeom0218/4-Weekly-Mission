import React, { useState, useEffect } from "react";
import { getFolderList } from "../api";
import "../modal/Add.css";
import checkIcon from "../assets/check.svg";
import closeIcon from "../assets/close.svg";

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
    <div className="modalBackground">
      <div className="modalAddContainer">
        <div className="modalTitle">
          <p id="mainTitle">폴더에 추가</p>
          <p id="subTitle">{linkUrl}</p>
        </div>
        <div className="listDivFrame">
          {list.map(({ name, id, link }: listType, index) => {
            return (
              <div
                className={`listDiv ${
                  selectedItem === index ? "selected" : ""
                }`} // 클릭한 항목인 경우에는 'selected' 클래스를 추가
                key={id}
                onClick={() => clickListItem(index)} // 클릭 이벤트 핸들러 추가
              >
                <div className="listContent">
                  <span id="name">{name}</span>
                  <span id="linkCount">{`${link.count}개 링크`}</span>
                </div>
                {selectedItem === index && (
                  <img src={checkIcon} alt="checkIcon" />
                )}
              </div>
            );
          })}
        </div>
        <img id="closeIcon" src={closeIcon} alt="closeIcon" onClick={onClose} />
        <button onClick={click}>추가하기</button>
      </div>
    </div>
  );
}
