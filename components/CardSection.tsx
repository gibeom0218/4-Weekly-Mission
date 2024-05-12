import React from "react";
import { getFolderLink } from "@/pages/api/api";
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
  //카드 리스트들을 가져오기 위한
  const cardList = useQuery({
    queryKey: ["cardList"],
    queryFn: async () => await getFolderLink(id),
  });

  const dummyFunc = () => {};

  return (
    <div className={styles.cardSection}>
      <div className={styles.cardFrame}>
        <SearchBar onInputChange={dummyFunc} />
        <div className={styles.card_list}>
          {cardList.data &&
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
