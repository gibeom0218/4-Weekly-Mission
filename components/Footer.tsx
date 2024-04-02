import React from "react";
import Image from "next/image";
import styles from "@/styles/Footer.module.css";
import Facebook from "@/public/images/facebook_icon.svg";
import Insta from "@/public/images/instagram_icon.svg";
import Twitter from "@/public/images/twitter_icon.svg";
import Youtube from "@/public/images/youtube_icon.svg";

export default function Footer() {
  return (
    <footer className={styles.footerFrame}>
      <div className={styles.footerContent}>
        <span>©codeit - 2023</span>
        <div>
          <span>Privacy Policy</span>
          &nbsp;&nbsp;&nbsp;
          <span>FAQ</span>
        </div>
        <div>
          <Image src={Facebook} alt="페이스북 아이콘" />
          &nbsp;&nbsp;
          <Image src={Twitter} alt="트위터 아이콘" />
          &nbsp;&nbsp;
          <Image src={Youtube} alt="유튜브 아이콘" />
          &nbsp;&nbsp;
          <Image src={Insta} alt="인스타 아이콘" />
        </div>
      </div>
    </footer>
  );
}
