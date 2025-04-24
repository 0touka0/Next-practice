"use client";

import Input from "@/components/Input/Input";
import styles from "./login.module.css";
import { useState, useCallback } from "react";
import Button from "@/components/Button/Button";
import axios from "axios";

type ErrorMessage = {
  email?: string[];
  password?: string[];
  general?: string;
};

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorMessage>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: undefined }));
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: undefined }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setErrors({});
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost/api/login", { email, password }, { withCredentials: true });

      setSuccessMessage("ログインが完了しました");
      window.location.href = "/"; // トップページにリダイレクト
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ general: "ログインに失敗しました。もう一度お試しください。" });
        }
      } else {
        setErrors({ general: "予期せぬエラーが発生しました。" });
      }
    }
  }, [email, password]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>

      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      {errors.general && <div className={styles.errorMessage}>{errors.general}</div>}

      <div className={styles.formGroup}>
        <Input
          id="email"
          label="メールアドレス"
          value={email}
          placeholder="例: test@example.com"
          onChange={handleEmailChange}
          error={errors.email?.[0]}
        />

        <Input
          id="password"
          label="パスワード"
          value={password}
          placeholder="例: coachtech1106"
          onChange={handlePasswordChange}
          error={errors.password?.[0]}
        />

        <Button onClick={handleSubmit}>ログイン</Button>
      </div>
    </div>
  );
}
