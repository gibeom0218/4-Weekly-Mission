import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/Input";
import SignLogoFrame from "@/components/SignLogoFrame";
import { postSignIn } from "./api/api";
import styles from "@/styles/SignUpPage.module.css";
import kakaoIcon from "@/public/images/kakao.svg";
import googleIcon from "@/public/images/google.svg";

export default function SignUp() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordChkValue, setPasswordChkValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordChkError, setPasswordChkError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/folder");
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordChkValue !== passwordValue) {
      setPasswordChkError("비밀번호가 일치하지 않아요.");
    } else if (emailError || passwordError || passwordChkError) {
      //에러가 하나라도 있을 경우에는 회원가입 실행 X
    } else {
      console.log(111);
    }

    // e.preventDefault();
    // const response = await postSignIn(emailValue, passwordValue);
    // const { data } = await response.json();
    // if (response.status === 200) {
    //   router.push("/folder");
    //   localStorage.setItem("accessToken", data.accessToken);
    // } else {
    //   setEmailError("이메일을 확인해 주세요.");
    //   setPasswordError("비밀번호를 확인해 주세요.");
    // }
  };

  const handleEmailChange = (value: string) => {
    setEmailValue(value);
  };

  const handlePasswordChange = (value: string) => {
    setPasswordValue(value);
  };

  const handlePasswordChkChange = (value: string) => {
    setPasswordChkValue(value);
  };

  const handleSetIdErrMsg = (value: string) => {
    setEmailError(value);
  };

  const handleSetPasswordErrMsg = (value: string) => {
    setPasswordError(value);
  };

  const handleSetPasswordChkErrMsg = (value: string) => {
    setPasswordChkError(value);
  };

  return (
    <div className={styles.container}>
      <form className={styles.logInFrame} onSubmit={handleSubmit}>
        <SignLogoFrame type="signUp" />
        <div className={styles.inputCommonFrame}>
          <div className={styles.inputFrame}>
            <span>이메일</span>
            <Input
              page="signUp"
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

          <div className={styles.inputFrame}>
            <span>비밀번호 확인</span>
            <Input
              inputType="passwordChk"
              onChange={handlePasswordChkChange}
              onSetErrMsg={handleSetPasswordChkErrMsg}
              isError={passwordChkError}
            />
            {passwordChkError && (
              <p className={styles.errMsg}>{passwordChkError}</p>
            )}
          </div>
        </div>

        <button id={styles.signUpButton} type="submit">
          회원가입
        </button>

        <div className={styles.socialLoginFrame}>
          <span>다른 방식으로 가입하기</span>
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
