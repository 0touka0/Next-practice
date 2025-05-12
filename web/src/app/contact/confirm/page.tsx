import Button from "@/components/Button/Button";
import Link from "next/link";
import styles from "./confirm.module.css";

export default function Confirm() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Confirm</h2>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>お名前</th>
            <td className={styles.tableData}>
              <span className={styles.firstName}>山田</span>
              <span className={styles.lastName}>太郎</span>
            </td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>性別</th>
            <td className={styles.tableData}>男性</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>メールアドレス</th>
            <td className={styles.tableData}>test@example.com</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>電話番号</th>
            <td className={styles.tableData}>09012345678</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>住所</th>
            <td className={styles.tableData}>東京都千代田区永田町1-7-1</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>建物名</th>
            <td className={styles.tableData}>永田町ビル</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>お問い合わせの種類</th>
            <td className={styles.tableData}>商品の交換について</td>
          </tr>
          <tr className={styles.tableRow}>
            <th className={styles.tableHeader}>お問い合わせ内容</th>
            <td className={styles.tableData}>
              届いた商品が注文した商品ではありませんでした。
              <br />
              商品の取り替えをお願いします。
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.buttonGroup}>
        <Button className={styles.button}>送信</Button>
        <Link href="/contact/form" className={styles.linkButton}>
          修正
        </Link>
      </div>
    </div>
  );
}
