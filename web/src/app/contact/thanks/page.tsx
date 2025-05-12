import styles from "./thanks.module.css";
import Link from "next/link";
import Button from "@/components/Button/Button";

export default function Thanks() {
  return (
    <div className={styles.container}>
      <p className={styles.backgroundText}>Thank you</p>
      <h2 className={styles.title}>お問い合わせありがとうございました。</h2>
      <Button display="block" className={styles.button}>
        <Link href="/" className={styles.buttonLink}>
          HOME
        </Link>
      </Button>
    </div>
  );
}
