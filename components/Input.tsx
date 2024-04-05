import React, { useState } from "react";
import Image from "next/image";
import styles from "@/styles/Input.module.css";
import eyeOff from "@/public/images/eye-off.svg";
import eyeOn from "@/public/images/eye-on.svg";

interface InputProp {
  inputType: string;
  onChange: (value: string) => void;
}

export default function Input({ inputType, onChange }: InputProp) {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [type, setType] = useState(inputType);
  const [errorMsg, setErrorMsg] = useState("");

  const emailChk = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordChk = /^(?=.*\d)(?=.*[a-z])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleError = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsFocused(false);

    if (!value && inputType === "id") {
      setErrorMsg("이메일을 입력해 주세요.");
    } else if (!value && inputType === "password") {
      setErrorMsg("비밀번호를 입력해 주세요.");
    } else if (inputType === "id" && !emailChk.test(value)) {
      setErrorMsg("올바른 이메일 주소를 입력해주세요.");
    } else if (inputType === "password" && !passwordChk.test(value)) {
      setErrorMsg("올바른 비밀번호를 입력해주세요.");
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
        } ${errorMsg ? styles.err : ""}`}
      >
        <input
          type={type}
          placeholder={
            type === "id"
              ? "이메일을 입력해 주세요."
              : "비밀번호를 입력해 주세요."
          }
          onFocus={() => setIsFocused(true)}
          onBlur={handleError}
          onChange={handleChange}
        />
        {inputType === "password" && (
          <Image
            src={isShowPassword ? eyeOn : eyeOff}
            alt={isShowPassword ? "숨김" : "표시"}
            onClick={handleIcon}
          />
        )}
      </div>
      {errorMsg && <p className={styles.errMsg}>{errorMsg}</p>}
    </>
  );
}
