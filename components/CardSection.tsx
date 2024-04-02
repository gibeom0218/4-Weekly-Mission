import React from "react";
import { useEffect, useState } from "react";
import { getFolder } from "@/pages/api/api";
import CardList from "@/components/CardList";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/CardSection.module.css";

interface CardListType {
  id: number;
  createdAt: string;
  url: string;
  description: string;
  imageSource: string;
}

export default function CardSection() {
  const [cardList, setCardList] = useState<CardListType[]>([]);

  useEffect(() => {
    async function getProfileFolder() {
      try {
        const {
          folder: { links },
        } = await getFolder();
        setCardList(links);
      } catch (error) {
        console.error(error);
      }
    }

    getProfileFolder();
  }, []);

  const dummyFunc = () => {};

  return (
    <div className={styles.cardSection}>
      <div className={styles.cardFrame}>
        <SearchBar onInputChange={dummyFunc} />
        <div className={styles.card_list}>
          {cardList.map(({ id, createdAt, url, description, imageSource }) => {
            return (
              <CardList
                key={id}
                url={url}
                createdAt={createdAt}
                desc={description}
                imgUrl={imageSource}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
