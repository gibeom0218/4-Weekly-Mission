import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/SearchBar.module.css";
import searchIcon from "@/public/images/Search.svg";
import closeIcon from "@/public/images/close.svg";

interface SearchProps {
  onInputChange: (value: string) => void;
}

export default function SearchBar({ onInputChange }: SearchProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onInputChange(newValue);
    setInputValue(newValue);
  };

  const handleInputClear = () => {
    onInputChange("");
    setInputValue("");
  };

  return (
    <form className={styles.searchBar}>
      <div className={styles.searchBarElement}>
        <Image id={styles.searchIcon} src={searchIcon} alt="검색 아이콘" />
        <input
          type="text"
          id={styles.inputText}
          value={inputValue}
          placeholder="링크를 검색해보세요."
          onChange={handleInputChange}
        />
        <Image
          id={styles.close}
          src={closeIcon}
          alt="닫기 아이콘"
          onClick={handleInputClear}
        />
      </div>
    </form>
  );
}
