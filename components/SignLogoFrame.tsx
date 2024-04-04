import Image from "next/image";
import styles from "@/styles/SignLogoFrame.module.css";
import logo from "@/public/images/logo.svg";

interface SignLogoProp {
  type: string;
}

export default function SignLogoFrame({ type }: SignLogoProp) {
  return (
    <div className={styles.logoFrame}>
      <Image id={styles.logoImg} src={logo} alt="로고이미지" />
      <div className={styles.commentFrame}>
        <span id={styles.comment}>
          {type === "signIn" ? "회원이 아니신가요?" : "이미 회원이신가요?"}
        </span>
        <a
          id={styles.linkComment}
          href={type === "signIn" ? "/signup" : "/signin"}
        >
          {type === "signIn" ? "회원 가입하기" : "로그인 하기"}
        </a>
      </div>
    </div>
  );
}
