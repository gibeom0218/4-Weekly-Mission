import React, { useState } from "react";
import "./SearchBar.css";
import searchIcon from "../assets/Search.svg";
import closeIcon from "../assets/close.svg";

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
    <form className="searchBar">
      <div className="searchBarElement">
        <img id="searchIcon" src={searchIcon} alt="검색 아이콘" />
        <input
          type="text"
          id="inputText"
          value={inputValue}
          placeholder="링크를 검색해보세요."
          onChange={handleInputChange}
        />
        <img
          id="close"
          src={closeIcon}
          alt="닫기 아이콘"
          onClick={handleInputClear}
        />
      </div>
    </form>
  );
}
