import React from "react";
import NavigationBar from "@/components/NavigationBar";
import FolderBar from "@/components/FolderBar";
import CardSection from "@/components/CardSection";
import Footer from "@/components/Footer";
import styles from "@/styles/SharedPage.module.css";

function SharedPage() {
  return (
    <div className={styles.SharedPage}>
      <NavigationBar />
      <FolderBar />
      <CardSection />
      <Footer />
    </div>
  );
}

export default SharedPage;
