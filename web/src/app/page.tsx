"use client";

import { useState, useEffect } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import styles from "./form.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormData } from "@/types/contact";

const initialFormData: FormData = {
  first_name: "",
  last_name: "",
  gender: "1",
  email: "",
  tell_1: "",
  tell_2: "",
  tell_3: "",
  address: "",
  building: "",
  category_id: 1,
  detail: "",
};

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { tell_1, tell_2, tell_3, ...rest } = formData;
      const tell_concat = `${tell_1}${tell_2}${tell_3}`;

      const response = await axios.post(
        "/api/contact/temp-store",
        { ...rest, tell: tell_concat },
        { withCredentials: true }
      );

      if (response.status === 200) {
        router.push("/contact/confirm");
      }
    } catch (error) {
      setError("送信に失敗しました。もう一度お試しください。");
      console.error("送信エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSessionData = async () => {
    try {
      setError(null);
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
      setError("データの取得に失敗しました。");
      console.error("セッションデータ取得エラー:", error);
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contact</h2>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.formContainer}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
            <label htmlFor="gender-male" className={styles.label}>
              性別
            </label>
            <div className={styles.radioGroup}>
              <Input
                type="radio"
                id="gender-male"
                name="gender"
                value="1"
                onChange={handleChange}
                checked={formData.gender === "1"}
              />
              <label htmlFor="gender-male">男性</label>
              <Input
                type="radio"
                id="gender-female"
                name="gender"
                value="2"
                onChange={handleChange}
                checked={formData.gender === "2"}
              />
              <label htmlFor="gender-female">女性</label>
              <Input
                type="radio"
                id="gender-other"
                name="gender"
                value="3"
                onChange={handleChange}
                checked={formData.gender === "3"}
              />
              <label htmlFor="gender-other">その他</label>
            </div>
          </div>

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
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

          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>
              お問い合わせの種類
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="category"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">選択してください</option>
                <option value="1">商品のお届けについて</option>
                <option value="2">商品の交換について</option>
                <option value="3">商品トラブル</option>
                <option value="4">ショップへのお問い合わせ</option>
                <option value="5">その他</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
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

          <div className={styles.buttonContainer}>
            <Button type="submit" variant="primary" size="medium" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? "送信中..." : "確認画面へ"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
