"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { FormData } from "@/types/contactForm";
import { useCategories } from "@/hooks/useCategories";
import styles from "./form.module.css";

const initialFormData: FormData = {
  first_name: "",
  last_name: "",
  gender: 1,
  email: "",
  tell_1: "",
  tell_2: "",
  tell_3: "",
  address: "",
  building: "",
  category_id: 0,
  detail: "",
};

type ValidationErrors = {
  [key: string]: string[];
};

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { categories } = useCategories();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // 入力時に該当フィールドのエラーをクリア
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrors({});

      const response = await axios.post("/api/contact/temp-store", { ...formData }, { withCredentials: true });

      router.push("/confirm");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrors(error.response?.data.errors);
      }
      console.error("送信エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSessionData = async () => {
    try {
      const response = await axios.get("/api/contact/session-data", {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (response.data?.tell) {
        const tell = response.data.tell;
        response.data.tell_1 = tell.substring(0, 3);
        response.data.tell_2 = tell.substring(3, 7);
        response.data.tell_3 = tell.substring(7);
        delete response.data.tell;
      }

      setFormData((prev) => ({
        ...prev,
        ...response.data,
      }));
    } catch (error) {
      console.error("セッションデータ取得エラー:", error);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contact</h2>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <label htmlFor="first_name" className={styles.label}>
              お名前
            </label>
            <div className={styles.nameInputs}>
              <Input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                placeholder="例：山田"
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                placeholder="例：太郎"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <p className={styles.errorMessage}>
            {errors.first_name ? errors.first_name[0] : errors.last_name ? errors.last_name[0] : ""}
          </p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <label htmlFor="gender-male" className={styles.label}>
              性別
            </label>
            <div className={styles.radioGroup}>
              <Input
                type="radio"
                id="gender-male"
                name="gender"
                value={1}
                onChange={handleChange}
                checked={formData.gender === 1}
                required
              />
              <label htmlFor="gender-male">男性</label>
              <Input
                type="radio"
                id="gender-female"
                name="gender"
                value={2}
                onChange={handleChange}
                checked={formData.gender === 2}
                required
              />
              <label htmlFor="gender-female">女性</label>
              <Input
                type="radio"
                id="gender-other"
                name="gender"
                value={3}
                onChange={handleChange}
                checked={formData.gender === 3}
                required
              />
              <label htmlFor="gender-other">その他</label>
            </div>
          </div>
          <p className={styles.errorMessage}>{errors.gender ? errors.gender[0] : ""}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <label htmlFor="email" className={styles.label}>
              メールアドレス
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder="例：test@example.com"
              onChange={handleChange}
              required
            />
          </div>
          <p className={styles.errorMessage}>{errors.email ? errors.email[0] : ""}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <label htmlFor="tell_1" className={styles.label}>
              電話番号
            </label>
            <div className={styles.tellInputs}>
              <Input
                type="tel"
                id="tell_1"
                name="tell_1"
                value={formData.tell_1}
                placeholder="090"
                onChange={handleChange}
                required
              />
              <span>-</span>
              <Input
                type="tel"
                id="tell_2"
                name="tell_2"
                value={formData.tell_2}
                placeholder="1234"
                onChange={handleChange}
                required
              />
              <span>-</span>
              <Input
                type="tel"
                id="tell_3"
                name="tell_3"
                value={formData.tell_3}
                placeholder="5678"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <p className={styles.errorMessage}>{errors.tell ? errors.tell[0] : ""}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <label htmlFor="address" className={styles.label}>
              住所
            </label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              placeholder="例：東京都渋谷区千駄ヶ谷1-2-3"
              onChange={handleChange}
              required
            />
          </div>
          <p className={styles.errorMessage}>{errors.address ? errors.address[0] : ""}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <label htmlFor="building" className={styles.label}>
              建物名
            </label>
            <Input
              type="text"
              id="building"
              name="building"
              value={formData.building}
              placeholder="例：千駄ヶ谷マンション101"
              onChange={handleChange}
            />
          </div>
          <p className={styles.errorMessage}>{errors.building ? errors.building[0] : ""}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <label htmlFor="category" className={styles.label}>
              お問い合わせの種類
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="category"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className={`${styles.select} ${formData.category_id ? styles.selected : ""}`}
                required
              >
                <option value="">選択してください</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.content}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className={styles.errorMessage}>{errors.category_id ? errors.category_id[0] : ""}</p>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.formGroupContent}>
            <label htmlFor="detail" className={styles.label}>
              お問い合わせ内容
            </label>
            <textarea
              id="detail"
              name="detail"
              value={formData.detail}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="お問い合わせ内容をご記載ください"
              required
            />
          </div>
          <p className={styles.errorMessage}>{errors.detail ? errors.detail[0] : ""}</p>
        </div>

        <div className={styles.buttonContainer}>
          <Button type="submit" variant="primary" size="medium" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? "送信中..." : "確認画面へ"}
          </Button>
        </div>
      </form>
    </div>
  );
}
