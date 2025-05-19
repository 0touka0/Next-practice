import { InputProps } from "../../types/input";
import styles from "./Input.module.css";

export default function Input({ id, type, value, placeholder, onChange, name, checked, required }: InputProps) {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
      checked={checked}
      required={required}
    />
  );
}
