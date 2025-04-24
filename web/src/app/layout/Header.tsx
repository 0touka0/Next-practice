"use client";

import "./header.css";
import Link from "next/link.js";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // サーバーに認証状態を確認するリクエストを送信
    axios
      .get("/api/auth/check", { withCredentials: true })
      .then((response) => {
        setIsLoggedIn(response.data.authenticated);
        console.log("ログイン状態を確認できました。");
      })
      .catch(() => {
        setIsLoggedIn(false);
        console.log("ログイン状態を確認できませんでした。");
      });
  }, []);

  const handleLogout = () => {
    // サーバーにログアウトリクエストを送信
    axios
      .post("/api/logout", {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        window.location.href = "/login";
      })
      .catch(() => {
        console.error("ログアウトに失敗しました。");
      });
  };

  const renderLink = () => {
    if (isLoggedIn) {
      return (
        <button onClick={handleLogout} className="header-link">
          Logout
        </button>
      );
    } else if (pathname === "/login") {
      return (
        <Link href="/register" className="header-link">
          Register
        </Link>
      );
    } else {
      return (
        <Link href="/login" className="header-link">
          Login
        </Link>
      );
    }
  };

  return (
    <header className="header">
      <h1 className="header-title">FashionablyLate</h1>
      <div className="header-links">{renderLink()}</div>
    </header>
  );
}
