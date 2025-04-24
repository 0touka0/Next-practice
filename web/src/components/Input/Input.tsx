import { InputType } from "../../types/input";
import styles from "./Input.module.css";

export default function Input({ id, label, value, placeholder, onChange, error }: InputType) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.error : ""}`}
      />
      <div className={styles.errorMessage}>{error && <span>{error}</span>}</div>
    </div>
  );
}
