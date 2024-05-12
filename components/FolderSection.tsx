import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getFolderList, getAllLinks, getFolderLink } from "@/pages/api/api";
import { useQuery } from "@tanstack/react-query";
import CardList from "@/components/CardList";
import SearchBar from "@/components/SearchBar";
import addImg from "@/public/images/add.svg";
import shareIcon from "@/public/images/share.svg";
import penIcon from "@/public/images/pen.svg";
import deleteIcon from "@/public/images/delete.svg";
import styles from "@/styles/FolderSection.module.css";
import Edit from "@/components/modal/Edit";
import AddFolder from "@/components/modal/AddFolder";
import Share from "@/components/modal/Share";
import DeleteFolder from "@/components/modal/DeleteFolder";

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
      setFilteredCardList(data);
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
  const folderList = useQuery({
    queryKey: ["folderList"],
    queryFn: async () => await getFolderList(),
  });

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
    <div className={styles.FolderSection}>
      <div className={styles.FolderSection_Frame}>
        <SearchBar onInputChange={handleInputChange} />
        {isEditNameModal && (
          <Edit folderName={folderName} onClose={clickEditName} />
        )}
        {isAddFolderModal && <AddFolder onClose={clickAddFolder} />}
        {isShareModal && <Share folderName={folderName} onClose={clickShare} />}
        {isDeleteFolderModal && (
          <DeleteFolder folderName={folderName} onClose={clickDeleteFolder} />
        )}
        <div className={styles.FolderBtnList}>
          <div className={styles.FolderBtn}>
            <button
              className={selectedFolderId === "전체" ? styles.active : ""}
              onClick={() => {
                folderAllNameClick("전체");
                setSelectedFolderId("전체");
              }}
            >
              전체
            </button>
            {folderList.data?.map(({ name, id }: FolderListType) => {
              return (
                <button
                  key={id}
                  className={selectedFolderId === id ? styles.active : ""}
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
          <div className={styles.AddFolder}>
            <span>폴더 추가</span>
            <Image
              id={styles.addIcon}
              src={addImg}
              alt="폴더 추가 버튼"
              onClick={clickAddFolder}
            />
          </div>
        </div>
        {cardList[0] ? (
          <>
            <div className={styles.FolderNameBar}>
              <span>{folderName}</span>
              <div className={styles.OptionIcon}>
                <Image src={shareIcon} alt="공유 아이콘" onClick={clickShare} />
                <span>공유</span>
                <Image
                  src={penIcon}
                  alt="이름 변경 아이콘"
                  onClick={clickEditName}
                />
                <span>이름 변경</span>
                <Image
                  src={deleteIcon}
                  alt="삭제 아이콘"
                  onClick={clickDeleteFolder}
                />
                <span>삭제</span>
              </div>
            </div>
            <div className={styles.card_list}>
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
            <div className={styles.FolderNameBar}>
              <span>{folderName}</span>
              <div className={styles.OptionIcon}>
                <Image src={shareIcon} alt="공유 아이콘" onClick={clickShare} />
                <span>공유</span>
                <Image
                  src={penIcon}
                  alt="이름 변경 아이콘"
                  onClick={clickEditName}
                />
                <span>이름 변경</span>
                <Image
                  src={deleteIcon}
                  alt="삭제 아이콘"
                  onClick={clickDeleteFolder}
                />
                <span>삭제</span>
              </div>
            </div>
            <div className={styles.noLinkMsg}>저장된 링크가 없습니다.</div>
          </>
        )}
      </div>
    </div>
  );
}
