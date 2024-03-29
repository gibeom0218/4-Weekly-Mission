import React from "react";
import { useEffect, useState } from "react";
import { getFolder } from "../api";
import CardList from "./CardList";
import SearchBar from "./SearchBar";
import "./CardSection.css";

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
    async function getProFileFolder() {
      try {
        const {
          folder: { links },
        } = await getFolder();
        setCardList(links);
      } catch (error) {
        console.error(error);
      }
    }

    getProFileFolder();
  }, []);

  return (
    <div className="cardSection">
      <div className="cardFrame">
        <SearchBar />
        <div className="card-list">
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