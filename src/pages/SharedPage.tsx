import React from "react";
import NavigationBar from "../components/NavigationBar";
import FolderBar from "../components/FolderBar";
import CardSection from "../components/CardSection";
import Footer from "../components/Footer";
import "./SharedPage.css";

function SharedPage() {
  return (
    <div className="SharedPage">
      <NavigationBar />
      <FolderBar />
      <CardSection />
      <Footer />
    </div>
  );
}

export default SharedPage;
