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
import AddFolder from "../modal/AddFolder";
import Share from "../modal/Share";
import DeleteFolder from "../modal/DeleteFolder";

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
  const [folderName, setFolderName] = useState("폴더를 선택해주세요");
  const [folderList, setFolderList] = useState<FolderListType[]>([]);
  const [cardList, setCardList] = useState<CardListType[]>([]);
  const [isEditNameModal, setIsEditNameModal] = useState<boolean>(false);
  const [isAddFolderModal, setIsAddFolderModal] = useState<boolean>(false);
  const [isShareModal, setIsShareModal] = useState<boolean>(false);
  const [isDeleteFolderModal, setIsDeleteFolderModal] =
    useState<boolean>(false);
  const [selectedFolderId, setSelectedFolderId] = useState<number | string>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredCardList, setFilteredCardList] = useState<CardListType[]>([]);

  //전체 폴더 클릭

  async function getAllList() {
    try {
      const { data } = await getAllLinks();
      setCardList(data);
      setFolderName("전체");
      console.log(folderList);
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

  //폴더 추가 아이콘 클릭시 뜨는 모달창 함수
  const clickAddFolder = () => {
    setIsAddFolderModal(!isAddFolderModal);
  };

  //폴더 공유 아이콘 클릭시 뜨는 모달창 함수
  const clickShare = () => {
    setIsShareModal(!isShareModal);
  };

  //삭제 아이콘 클릭시 뜨는 모달창 함수
  const clickDeleteFolder = () => {
    setIsDeleteFolderModal(!isDeleteFolderModal);
  };

  //검색 바의 값이 변화될때 실행되는 함수
  const handleInputChange = (newValue: string) => {
    setSearchInput(newValue);
    if (newValue === "") {
      // 입력값이 없을 때는 전체 카드 리스트를 보여줍니다.
      setFilteredCardList(cardList);
    } else {
      // 입력값이 있을 때는 검색어에 맞는 카드 리스트를 필터링합니다.
      const filteredList =
        cardList && searchInput
          ? cardList.filter(
              (card) =>
                (card.url && card.url.includes(newValue)) ||
                (card.description && card.description.includes(newValue))
            )
          : cardList;
      setFilteredCardList(filteredList);
    }
  };

  return (
    <div className="FolderSection">
      <div className="FolderSection-Frame">
        <SearchBar onInputChange={handleInputChange} />
        {isEditNameModal && (
          <Edit folderName={folderName} onClose={clickEditName} />
        )}
        {isAddFolderModal && <AddFolder onClose={clickAddFolder} />}
        {isShareModal && <Share folderName={folderName} onClose={clickShare} />}
        {isDeleteFolderModal && (
          <DeleteFolder folderName={folderName} onClose={clickDeleteFolder} />
        )}
        <div className="FolderBtnList">
          <div className="FolderBtn">
            <button
              className={selectedFolderId === "전체" ? "active" : ""}
              onClick={() => {
                folderAllNameClick("전체");
                setSelectedFolderId("전체");
              }}
            >
              전체
            </button>
            {folderList.map(({ name, id }) => {
              return (
                <button
                  key={id}
                  className={selectedFolderId === id ? "active" : ""}
                  onClick={() => {
                    folderNameClick(name, id);
                    setSelectedFolderId(id);
                  }}
                >
                  {name}
                </button>
              );
            })}
          </div>
          <div className="AddFolder">
            <span>폴더 추가</span>
            <img src={addImg} alt="폴더 추가 버튼" onClick={clickAddFolder} />
          </div>
        </div>
        {cardList[0] ? (
          <>
            <div className="FolderNameBar">
              <span>{folderName}</span>
              <div className="OptionIcon">
                <img src={shareIcon} alt="공유 아이콘" onClick={clickShare} />
                <span>공유</span>
                <img
                  src={penIcon}
                  alt="이름 변경 아이콘"
                  onClick={clickEditName}
                />
                <span>이름 변경</span>
                <img
                  src={deleteIcon}
                  alt="삭제 아이콘"
                  onClick={clickDeleteFolder}
                />
                <span>삭제</span>
              </div>
            </div>
            <div className="card-list">
              {filteredCardList.map(
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
          <>
            <div className="FolderNameBar">
              <span>{folderName}</span>
              <div className="OptionIcon">
                <img src={shareIcon} alt="공유 아이콘" onClick={clickShare} />
                <span>공유</span>
                <img
                  src={penIcon}
                  alt="이름 변경 아이콘"
                  onClick={clickEditName}
                />
                <span>이름 변경</span>
                <img
                  src={deleteIcon}
                  alt="삭제 아이콘"
                  onClick={clickDeleteFolder}
                />
                <span>삭제</span>
              </div>
            </div>
            <div className="noLinkMsg">저장된 링크가 없습니다.</div>
          </>
        )}
      </div>
    </div>
  );
}
