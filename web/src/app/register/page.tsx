"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import styles from "./register.module.css";

type ErrorMessage = {
  name?: string[];
  email?: string[];
  password?: string[];
  general?: string;
};

type FormData = {
  name: string;
  email: string;
  password: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ErrorMessage>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleInputChange = useCallback((field: keyof FormData) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      /// initialFormDataのキーの中からvalueが変更された物をstate更新
      setFormData((currentFormData) => {
        const newFormData = {
          ...currentFormData,
          [field]: e.target.value,
        };
        return newFormData;
      });

      // inputに入力されるとエラー文を非表示にする
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: undefined,
      }));
    };
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
  }, []);

  // API通信でユーザー登録
  const handleSubmit = useCallback(async () => {
    setErrors({});
    setSuccessMessage("");

    try {
      await axios.get("/sanctum/csrf-cookie", { withCredentials: true });
      await axios.post("/api/register", formData, { withCredentials: true });

      resetForm();
      window.location.href = "/login";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          setErrors(error.response.data.errors);
        } else {
          setErrors({ general: "登録に失敗しました。もう一度お試しください。" });
        }
      } else {
        setErrors({ general: "予期せぬエラーが発生しました。" });
      }
    }
  }, [formData, resetForm]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>

      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      {errors.general && <div className={styles.errorMessage}>{errors.general}</div>}

      <div className={styles.formGroup}>
        <div className={styles.formField}>
          <label htmlFor="username" className={styles.label}>
            お名前
          </label>
          <Input
            id="username"
            name="name"
            type="text"
            value={formData.name}
            placeholder="例: 山田　太郎"
            onChange={handleInputChange("name")}
          />
          <div className="errorMessage">{errors.name && errors.name[0]}</div>
        </div>

        <div className={styles.formField}>
          <label htmlFor="email" className={styles.label}>
            メールアドレス
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            placeholder="例: test@example.com"
            onChange={handleInputChange("email")}
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
            value={formData.password}
            placeholder="例: coachtech1106"
            onChange={handleInputChange("password")}
          />
          <div className="errorMessage">{errors.password && errors.password[0]}</div>
        </div>

        <Button onClick={handleSubmit} variant="primary" size="large" display="block" className={styles.submitButton}>
          登録
        </Button>
      </div>
    </div>
  );
}
