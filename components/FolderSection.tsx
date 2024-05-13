import React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getFolderList, getAllLinks, getFolderLink } from "@/pages/api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const [folderId, setFolderId] = useState<number | null>(null);
  //카드리스트에 관한
  const [cardList, setCardList] = useState<CardListType[]>([]);
  const [filteredCardList, setFilteredCardList] = useState<CardListType[]>([]);
  //모달에 관한
  const [isEditNameModal, setIsEditNameModal] = useState<boolean>(false);
  const [isAddFolderModal, setIsAddFolderModal] = useState<boolean>(false);
  const [isShareModal, setIsShareModal] = useState<boolean>(false);
  const [isDeleteFolderModal, setIsDeleteFolderModal] =
    useState<boolean>(false);
  //선택한 id 버튼 활성화를 위해
  const [selectedFolderId, setSelectedFolderId] = useState<number | string>();
  //선택한 id 개별 폴더 링크를 가져오기 위해
  const [selectedId, setSelectedId] = useState<number>();
  const [searchInput, setSearchInput] = useState<string>("");

  const queryClient = useQueryClient();

  //전체 폴더 가져오기
  const allList = useQuery({
    queryKey: ["allList"],
    queryFn: async () => await getAllLinks(),
  });

  //전체 폴더 클릭
  async function folderAllNameClick() {
    setFolderName("전체");
    setFolderId(null);
    queryClient.setQueryData(["folderId"], null);
  }

  //개별 폴더 가져오기
  const individualList = useQuery({
    queryKey: ["individualList", selectedId],
    queryFn: async () => {
      if (selectedId) {
        const data = await getFolderLink(selectedId);
        return data;
      } else {
        return []; // 선택된 폴더가 없는 경우 빈 배열 반환
      }
    },
  });

  //개별 폴더 클릭
  async function folderNameClick(name: string, id: number) {
    setFolderName(name);
    setFolderId(id);
    queryClient.setQueryData(["folderId"], id);
  }
  //폴더이름을 클릭했을 때 즉각적으로 링크 데이터들이 바뀌도록
  useEffect(() => {
    if (individualList.data && folderName !== "전체") {
      setCardList(individualList.data);
      setFilteredCardList(individualList.data);
    } else if (folderName === "전체") {
      setCardList(allList.data);
      setFilteredCardList(allList.data);
    }
  }, [individualList.data, folderName, allList.data]);

  //폴더 버튼
  const folderList = useQuery({
    queryKey: ["folderList"],
    queryFn: async () => await getFolderList(),
  });

  //링크 추가를 위해 현재 폴더 id를 쿼리에 저장
  //처음 랜더링 될때 한번
  useQuery({
    queryKey: ["folderId"],
    queryFn: async () => {
      return folderId;
    },
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
        {isShareModal && (
          <Share
            folderId={folderId}
            folderName={folderName}
            onClose={clickShare}
          />
        )}
        {isDeleteFolderModal && (
          <DeleteFolder folderName={folderName} onClose={clickDeleteFolder} />
        )}
        <div className={styles.FolderBtnList}>
          <div className={styles.FolderBtn}>
            <button
              className={selectedFolderId === "전체" ? styles.active : ""}
              onClick={() => {
                folderAllNameClick();
                setSelectedFolderId("전체");
                setSelectedId(undefined);
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
                    setSelectedId(id);
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
        {cardList && cardList[0] ? (
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
