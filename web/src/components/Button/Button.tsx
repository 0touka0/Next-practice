import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "export" | "pagination" | "detail" | "close";
type ButtonSize = "small" | "medium" | "large";
type ButtonDisplay = "inline" | "block" | "inline-flex" | "flex";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  display?: ButtonDisplay;
  disabled?: boolean;
  className?: string;
};

export default function Button({
  onClick,
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  display = "inline-flex",
  disabled = false,
  className = "",
}: ButtonProps) {
  // 基本的なButtonクラスを最初に設定し、常に適用されるようにする
  const buttonBaseClass = styles.button;
  // バリアントとサイズのクラスを組み合わせる
  const variantSizeClass = `${styles[`variant_${variant}`]} ${styles[`size_${size}`]}`;
  // 表示モードのクラスを追加
  const displayClass = styles[`display_${display}`];
  // 外部から渡されたクラス名は最後に追加
  const combinedClassName = `${buttonBaseClass} ${variantSizeClass} ${displayClass} ${className}`.trim();

  return (
    <button className={combinedClassName} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
