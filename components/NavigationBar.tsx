import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/pages/api/api";
import styles from "@/styles/NavigationBar.module.css";
import Linkbrary from "@/public/images/logo.svg";

export default function NavigationBar() {
  const userInfo = useQuery({ queryKey: ["getUserInfo"], queryFn: getUser });
  const user = userInfo.data;

  return (
    <div className={styles.nav}>
      <div className={styles.navFrame}>
        <Link href="/">
          <Image id={styles.Linkbrary} src={Linkbrary} alt="Linkbrary" />
        </Link>
        {user ? (
          <div className={styles.account}>
            <img
              id={styles.MyProfile}
              src={user[0].image_source}
              alt="MyProfile"
            />
            <span id={styles.Email}>{user[0].email}</span>
          </div>
        ) : (
          <button>로그인</button>
        )}
      </div>
    </div>
  );
}
