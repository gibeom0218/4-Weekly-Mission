import React from "react";
import { useRouter } from "next/router";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import LinkAdd from "@/components/LinkAdd";
import FolderSection from "@/components/FolderSection";
import styles from "@/styles/FolderPage.module.css";

function FolderPage() {
  const router = useRouter();

  if (!localStorage.getItem("accessToken")) {
    router.push("/signin");
  }
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
