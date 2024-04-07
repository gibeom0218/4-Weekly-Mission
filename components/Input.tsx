import React, { useEffect, useState } from "react";
import Image from "next/image";
import { postCheckEmail } from "@/pages/api/api";
import styles from "@/styles/Input.module.css";
import eyeOff from "@/public/images/eye-off.svg";
import eyeOn from "@/public/images/eye-on.svg";

interface InputProp {
  page?: string;
  passwordValue?: string;
  inputType: string;
  onChange: (value: string) => void;
  onSetErrMsg: (value: string) => void;
  isError: string;
}

export default function Input({
  page,
  passwordValue,
  inputType,
  onChange,
  onSetErrMsg,
  isError,
}: InputProp) {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [type, setType] = useState(
    inputType === "passwordChk" ? "password" : inputType
  );
  const [errorMsg, setErrorMsg] = useState("");

  const emailChk = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordChk = /^(?=.*\d)(?=.*[a-z])[A-Za-z\d@$!%*?&]{8,}$/;

  //에러메시지가 바뀔때마다 에러메시지 초기화
  useEffect(() => {
    onSetErrMsg(errorMsg);
  }, [errorMsg]);

  const handleError = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsFocused(false);

    if (!value && inputType === "id") {
      setErrorMsg("이메일을 입력해 주세요.");
    } else if (!value && inputType === "password") {
      setErrorMsg("비밀번호를 입력해 주세요.");
    } else if (!value && inputType === "passwordChk") {
      setErrorMsg("비밀번호를 다시 한번 입력해 주세요.");
    } else if (inputType === "id" && !emailChk.test(value)) {
      setErrorMsg("올바른 이메일 주소를 입력해주세요.");
    } else if (inputType === "password" && !passwordChk.test(value)) {
      setErrorMsg("올바른 비밀번호를 입력해주세요.");
    } else if (inputType === "passwordChk" && passwordValue !== value) {
      setErrorMsg("비밀번호가 일치하지 않아요.");
    } else if (page === "signUp" && inputType === "id" && value) {
      //회원가입 페이지에서의 이메일 input태그이고 값이 있는경우
      const response = await postCheckEmail(value);
      if (response.status !== 200) {
        setErrorMsg("이미 사용 중인 이메일입니다.");
      } else {
        setErrorMsg("");
      }
    } else {
      setErrorMsg("");
    }
  };

  const handleIcon = () => {
    setIsShowPassword(!isShowPassword);
    if (type === "id") {
      setType("password");
    } else {
      setType("id");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue); // 부모 컴포넌트로 값을 전달
  };

  return (
    <>
      <div
        className={`${styles.inputContainer} ${
          isFocused ? styles.focused : ""
        } ${isError ? styles.err : ""}`}
      >
        <input
          type={type}
          placeholder={
            inputType === "id"
              ? "이메일을 입력해 주세요."
              : inputType === "password"
              ? "비밀번호를 입력해 주세요."
              : "비밀번호와 일치하는 값을 입력해 주세요."
          }
          onFocus={() => setIsFocused(true)}
          onBlur={handleError}
          onChange={handleChange}
        />
        {(inputType === "password" || inputType === "passwordChk") && (
          <Image
            src={isShowPassword ? eyeOn : eyeOff}
            alt={isShowPassword ? "숨김" : "표시"}
            onClick={handleIcon}
          />
        )}
      </div>
    </>
  );
}
