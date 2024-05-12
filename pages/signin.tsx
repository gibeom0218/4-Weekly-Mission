import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Input";
import SignLogoFrame from "@/components/SignLogoFrame";
import { postSignIn } from "./api/api";
import styles from "@/styles/SignInPage.module.css";
import kakaoIcon from "@/public/images/kakao.svg";
import googleIcon from "@/public/images/google.svg";

export default function SignIn() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/folder");
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await postSignIn(emailValue, passwordValue);

    const { accessToken } = await response.json();

    if (response.status === 200) {
      router.push("/folder");
      localStorage.setItem("accessToken", accessToken);
    } else {
      setEmailError("이메일을 확인해 주세요.");
      setPasswordError("비밀번호를 확인해 주세요.");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmailValue(value);
  };

  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
  };

  const handleSetIdErrMsg = (value: string) => {
    setEmailError(value);
  };

  const handleSetPasswordErrMsg = (value: string) => {
    setPasswordError(value);
  };

  return (
    <div className={styles.container}>
      <form className={styles.logInFrame} onSubmit={handleSubmit}>
        <SignLogoFrame type="signIn" />
        <div className={styles.inputCommonFrame}>
          <div className={styles.inputFrame}>
            <span>이메일</span>
            <Input
              inputType="id"
              onChange={handleEmailChange}
              onSetErrMsg={handleSetIdErrMsg}
              isError={emailError}
            />
            {emailError && <p className={styles.errMsg}>{emailError}</p>}
          </div>

          <div className={styles.inputFrame}>
            <span>비밀번호</span>
            <Input
              inputType="password"
              onChange={handlePasswordChange}
              onSetErrMsg={handleSetPasswordErrMsg}
              isError={passwordError}
            />
            {passwordError && <p className={styles.errMsg}>{passwordError}</p>}
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
