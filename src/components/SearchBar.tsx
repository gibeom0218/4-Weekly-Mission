import React from "react";
import "./SearchBar.css";
import searchIcon from "../assets/Search.svg";
import closeIcon from "../assets/close.svg";

export default function SearchBar() {
  return (
    <div className="searchBar">
      <div className="searchBarElement">
        <img id="searchIcon" src={searchIcon} alt="검색 아이콘" />
        <input type="text" id="inputText" placeholder="링크를 검색해보세요." />
        <img id="close" src={closeIcon} alt="닫기 아이콘" />
      </div>
    </div>
  );
}
