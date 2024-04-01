import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedPage from "./pages/SharedPage";
import FolderPage from "./pages/FolderPage";

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedPage />} />
        <Route path="/folder" element={<FolderPage />} />
      </Routes>
    </BrowserRouter>
  );
}
