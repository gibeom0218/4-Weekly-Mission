import React from "react";

import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import LinkAdd from "@/components/LinkAdd";
import FolderSection from "@/components/FolderSection";
import styles from "@/styles/FolderPage.module.css";

function FolderPage() {
  return (
    <div className={styles.FolderPage}>
      <NavigationBar />
      <LinkAdd />
      <FolderSection />
      <Footer />
    </div>
  );
}
export default FolderPage;
