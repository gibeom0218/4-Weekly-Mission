import React from "react";
import { useQuery } from "@tanstack/react-query";
import CardList from "@/components/CardList";
import SearchBar from "@/components/SearchBar";
import styles from "@/styles/CardSection.module.css";

interface CardListType {
  id: number;
  created_at: string;
  url: string;
  description: string;
  image_source: string;
}

export default function CardSection({ id }: any) {
  const cardList = useQuery({
    queryKey: ["individualList", Number(id)],
  });

  const dummyFunc = () => {};

  return (
    <div className={styles.cardSection}>
      <div className={styles.cardFrame}>
        <SearchBar onInputChange={dummyFunc} />
        <div className={styles.card_list}>
          {Array.isArray(cardList.data) &&
            cardList.data.map(
              ({
                id,
                created_at,
                url,
                description,
                image_source,
              }: CardListType) => {
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
      </div>
    </div>
  );
}
