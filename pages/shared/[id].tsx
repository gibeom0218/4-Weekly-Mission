import React from "react";
import { useRouter } from "next/router";
import NavigationBar from "@/components/NavigationBar";
import FolderBar from "@/components/FolderBar";
import CardSection from "@/components/CardSection";
import Footer from "@/components/Footer";
import styles from "@/styles/SharedPage.module.css";

function SharedPage() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <div className={styles.SharedPage}>
      <NavigationBar />
      <FolderBar id={id} />
      <CardSection id={id} />
      <Footer />
    </div>
  );
}

export default SharedPage;
