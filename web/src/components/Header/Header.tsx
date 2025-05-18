"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link.js";
import axios from "axios";
import "./header.css";

export default function Header() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const hideLogin = pathname === "/" || pathname === "/confirm";
  const hideHeader = pathname === "/thanks";

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
    <>
      {!hideHeader && (
        <header className="header">
          <h1 className="header-title">FashionablyLate</h1>
          {!hideLogin && <div className="header-links">{renderLink()}</div>}
        </header>
      )}
    </>
  );
}
