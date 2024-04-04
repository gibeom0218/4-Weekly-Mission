import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Input";
import styles from "@/styles/SignInPage.module.css";
import SignLogoFrame from "@/components/SignLogoFrame";
import kakaoIcon from "@/public/images/kakao.svg";
import googleIcon from "@/public/images/google.svg";

export default function SignIn() {
  return (
    <div className={styles.container}>
      <form className={styles.logInFrame}>
        <SignLogoFrame type="signIn" />
        <div className={styles.inputCommonFrame}>
          <div className={styles.inputFrame}>
            <span>이메일</span>
            <Input inputType="id" />
          </div>

          <div className={styles.inputFrame}>
            <span>비밀번호</span>
            <Input inputType="password" />
          </div>
        </div>

        <button id={styles.logInButton} type="submit">
          로그인
        </button>

        <div className={styles.socialLoginFrame}>
          <span>소셜 로그인</span>
          <div className={styles.socialLogin}>
            <div className={styles.iconGoogleBox}>
              <Link href="https://www.google.com">
                <Image src={googleIcon} alt="구글 아이콘" />
              </Link>
            </div>

            <div className={styles.iconKakaoBox}>
              <Link href="https://www.kakaocorp.com/page">
                <Image src={kakaoIcon} alt="카카오톡 아이콘" />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
