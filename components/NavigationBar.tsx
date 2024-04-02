import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser } from "@/pages/api/api";
import styles from "@/styles/NavigationBar.module.css";
import Linkbrary from "@/public/images/logo.svg";

interface ProfileObj {
  profileImageSource: string;
  email: string;
}

export default function NavigationBar() {
  const [profile, setProfile] = useState<ProfileObj | null>(null);

  useEffect(() => {
    async function getProFile() {
      try {
        const user = await getUser();
        if (user) {
          setProfile(user);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getProFile();
  }, []);

  return (
    <div className={styles.nav}>
      <div className={styles.navFrame}>
        <Link href="/">
          <Image id={styles.Linkbrary} src={Linkbrary} alt="Linkbrary" />
        </Link>
        {profile ? (
          <div className={styles.account}>
            <img
              id={styles.MyProfile}
              src={profile.profileImageSource}
              alt="MyProfile"
            />
            <span id={styles.Email}>{profile.email}</span>
          </div>
        ) : (
          <button>로그인</button>
        )}
      </div>
    </div>
  );
}
