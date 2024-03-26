import React from "react";
import { useEffect, useState } from "react";
import { getFolderList, getAllLinks, getFolderLink } from "../api";
import CardList from "./CardList";
import SearchBar from "./SearchBar";
import addImg from "../assets/add.svg";
import shareIcon from "../assets/share.svg";
import penIcon from "../assets/pen.svg";
import deleteIcon from "../assets/delete.svg";
import "./FolderSection.css";
import Edit from "../modal/Edit";

interface FolderListType {
  name: string;
  id: number;
}

interface CardListType {
  id: number;
  created_at: string;
  url: string;
  description: string;
  image_source: string;
}

export default function FolderSection() {
  const [folderName, setFolderName] = useState("");
  const [folderList, setFolderList] = useState<FolderListType[]>([]);
  const [cardList, setCardList] = useState<CardListType[]>([]);
  const [isEditNameModal, setIsEditNameModal] = useState<boolean>(false);

  //전체 폴더 클릭
  async function getAllList() {
    try {
      const { data } = await getAllLinks();
      setCardList(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function folderAllNameClick(all: string) {
    setFolderName(all);
    await getAllList();
  }
  //전체 폴더 클릭

  //개별 폴더 클릭

  async function getList(id: number) {
    try {
      const { data } = await getFolderLink(id);
      setCardList(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function folderNameClick(name: string, id: number) {
    setFolderName(name);
    await getList(id);
  }

  //개별 폴더 클릭

  //폴더 버튼
  useEffect(() => {
    async function getList() {
      try {
        const { data } = await getFolderList();
        setFolderList(data);
      } catch (error) {
        console.error(error);
      }
    }

    getList();
  }, []);

  //이름변경 아이콘 클릭시 뜨는 모달창 함수
  const clickEditName = () => {
    setIsEditNameModal(!isEditNameModal);
  };

  return (
    <div className="FolderSection">
      <div className="FolderSection-Frame">
        <SearchBar />
        {isEditNameModal && (
          <Edit folderName={folderName} onClose={clickEditName} />
        )}
        <div className="FolderBtnList">
          <div className="FolderBtn">
            <button onClick={() => folderAllNameClick("전체")}>전체</button>
            {folderList.map(({ name, id }) => {
              return (
                <button key={id} onClick={() => folderNameClick(name, id)}>
                  {name}
                </button>
              );
            })}
          </div>
          <div className="AddFolder">
            <span>폴더 추가</span>
            <img src={addImg} alt="폴더 추가 버튼" />
          </div>
        </div>
        {cardList[0] ? (
          <>
            <div className="FolderNameBar">
              <span>{folderName}</span>
              <div className="OptionIcon">
                <img src={shareIcon} alt="공유 아이콘" />
                <span>공유</span>
                <img
                  src={penIcon}
                  alt="이름 변경 아이콘"
                  onClick={clickEditName}
                />
                <span>이름 변경</span>
                <img src={deleteIcon} alt="삭제 아이콘" />
                <span>삭제</span>
              </div>
            </div>
            <div className="card-list">
              {cardList.map(
                ({ id, created_at, url, description, image_source }) => {
                  return (
                    <CardList
                      key={id}
                      url={url}
                      createdAt={created_at}
                      desc={description}
                      imgUrl={image_source}
                    />
                  );
                }
              )}
            </div>
          </>
        ) : (
          <div>저장된 링크가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
