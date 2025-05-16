"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import styles from "./login.module.css";

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
      // CSRFトークンを取得
      await axios.get("/sanctum/csrf-cookie", { withCredentials: true });
      // ログインリクエスト
      await axios.post("/api/login", { email, password }, { withCredentials: true });

      window.location.href = "/admin"; // トップページにリダイレクト
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
        <div className={styles.formField}>
          <label htmlFor="email" className={styles.label}>
            メールアドレス
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            placeholder="例: test@example.com"
            onChange={handleEmailChange}
          />
          <div className="errorMessage">{errors.email && errors.email[0]}</div>
        </div>

        <div className={styles.formField}>
          <label htmlFor="password" className={styles.label}>
            パスワード
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="例: coachtech1106"
            onChange={handlePasswordChange}
          />
          <div className="errorMessage">{errors.password && errors.password[0]}</div>
        </div>

        <Button onClick={handleSubmit} variant="primary" size="large" display="block" className={styles.loginButton}>
          ログイン
        </Button>
      </div>
    </div>
  );
}
