"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Button from "@/components/Button/Button";
import { ConfirmData } from "@/types/contactForm";
import { useCategories, Category } from "@/hooks/useCategories";
import styles from "./confirm.module.css";

export default function Confirm() {
  const router = useRouter();
  const [confirmData, setConfirmData] = useState<ConfirmData>({
    first_name: "",
    last_name: "",
    gender: 0,
    email: "",
    tell: "",
    address: "",
    building: "",
    category_id: 0,
    detail: "",
  });
  const { categories } = useCategories();

  // カテゴリーIDからカテゴリー名を取得する関数
  const getCategoryNameById = (id: number): string => {
    const category = categories.find((cat: Category) => cat.id === id);
    return category ? category.content : "不明なカテゴリー";
  };

  // セッションデータを取得
  const sessionData = async () => {
    const response = await axios.get("/api/contact/session-data", { withCredentials: true });
    console.log(response.data);
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await sessionData();
      const tell = data.tell_1 + data.tell_2 + data.tell_3;
      setConfirmData({ ...data, tell });
    };
    fetchData();
  }, []);

  // データを送信する関数
  const handleSubmit = async () => {
    try {
      // 性別を数値型に変換
      const submitData = {
        ...confirmData
      };

      const response = await axios.post("/api/contact/contact-store", submitData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // 送信成功時の処理
        router.push("/thanks");
      }
    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Confirm</h2>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>お名前</th>
            <td className={styles.tableData}>
              <span className={styles.firstName}>{confirmData.first_name}</span>
              <span className={styles.lastName}>{confirmData.last_name}</span>
            </td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>性別</th>
            <td className={styles.tableData}>
              {confirmData.gender === 1 ? "男性" : confirmData.gender === 2 ? "女性" : "その他"}
            </td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>メールアドレス</th>
            <td className={styles.tableData}>{confirmData.email}</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>電話番号</th>
            <td className={styles.tableData}>{confirmData.tell}</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>住所</th>
            <td className={styles.tableData}>{confirmData.address}</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>建物名</th>
            <td className={styles.tableData}>{confirmData.building}</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>お問い合わせの種類</th>
            <td className={styles.tableData}>{getCategoryNameById(Number(confirmData.category_id))}</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>お問い合わせ内容</th>
            <td className={styles.tableData}>{confirmData.detail}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.buttonGroup}>
        <Button className={styles.button} onClick={handleSubmit}>
          送信
        </Button>
        <Link href="/" className={styles.linkButton}>
          修正
        </Link>
      </div>
    </div>
  );
}
