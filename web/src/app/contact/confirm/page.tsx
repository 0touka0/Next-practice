"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import styles from "./confirm.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Confirm() {
  const [confirmData, setConfirmData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    tell: "",
    address: "",
    building: "",
    category_id: "",
    detail: "",
  });

  // セッションデータを取得
  const sessionData = async () => {
    const response = await axios.get("/api/contact/session-data", { withCredentials: true });
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await sessionData();
      setConfirmData(data);
    };
    fetchData();
  }, []);

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
              {confirmData.gender === "1" ? "男性" : confirmData.gender === "2" ? "女性" : "その他"}
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
            <td className={styles.tableData}>{confirmData.category_id === "1" ? "商品のお届けについて" : confirmData.category_id === "2" ? "商品の交換について" : confirmData.category_id === "3" ? "商品トラブル" : confirmData.category_id === "4" ? "ショップへのお問い合わせ" : "その他"}</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>お問い合わせ内容</th>
            <td className={styles.tableData}>{confirmData.detail}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.buttonGroup}>
        <Button className={styles.button}>送信</Button>
        <Link href="/" className={styles.linkButton}>
          修正
        </Link>
      </div>
    </div>
  );
}
