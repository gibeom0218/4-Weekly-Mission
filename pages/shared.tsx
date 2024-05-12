import React from "react";
import { useRouter } from "next/router";
import NavigationBar from "@/components/NavigationBar";
import FolderBar from "@/components/FolderBar";
import CardSection from "@/components/CardSection";
import Footer from "@/components/Footer";
import styles from "@/styles/SharedPage.module.css";

function SharedPage() {
  const router = useRouter();

  if (!localStorage.getItem("accessToken")) {
    router.push("/signin");
  }

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
