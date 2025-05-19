"use client";

import { useState, useEffect } from "react";
import styles from "./admin.module.css";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import { useSearchForm } from "@/hooks/useSearchForm";
import { usePagination } from "@/hooks/usePagination";
import { useCategories, Category } from "@/hooks/useCategories";
import axios from "axios";
import { ContactAdmin } from "@/types/contactAdmin";

export default function Admin() {
  const [contacts, setContacts] = useState<ContactAdmin[]>([]);
  const { searchForm, handleChange, filteredData, handleSearch, resetForm } = useSearchForm(contacts);
  const { currentPage, totalPages, currentItems, handlePageChange, resetPage } = usePagination({
    data: filteredData,
  });
  const [selectedInquiry, setSelectedInquiry] = useState<null | number>(null);
  const { categories } = useCategories();

  // カテゴリーIDからカテゴリー名を取得する関数
  const getCategoryNameById = (id: number): string => {
    const category = categories.find((cat: Category) => cat.id === id);
    return category ? category.content : "不明なカテゴリー";
  };

  // データ取得
  const fetchData = async () => {
    try {
      const res = await axios.get("/api/contacts");
      setContacts(res.data);
      handleSearch(res.data);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  // 初回マウント時にデータを取得
  useEffect(() => {
    fetchData();
  }, []);

  // 削除機能
  const handleDelete = async (id: number) => {
    if (!window.confirm("このお問い合わせを削除してもよろしいですか？")) {
      return;
    }

    try {
      await axios.get("/sanctum/csrf-cookie", { withCredentials: true });
      const response = await axios.delete(`/api/contacts/${id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("お問い合わせを削除しました");
        setSelectedInquiry(null);
        // データを再取得
        await fetchData();
        // ページをリセット
        resetPage();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("削除に失敗しました");
    }
  };

  // 検索とページリセットを連動
  const handleSearchWithReset = () => {
    handleSearch(contacts);
    resetPage();
  };

  // リセットとページリセットを連動
  const handleResetWithPage = () => {
    resetForm(contacts);
    resetPage();
  };

  // 詳細表示
  const showDetail = (id: number) => {
    setSelectedInquiry(id);
  };

  // モーダルを非表示にする
  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedInquiry(null);
    }
  };

  // エクスポート機能
  const handleExport = () => {
    console.log("エクスポート機能が呼び出されました");
    alert("お問い合わせデータをエクスポートしました");
  };

  return (
    <>
      {/* お問い合わせの管理画面 */}
      <div className={styles.container}>
        {/* ヘッダー */}
        <h1 className={styles.title}>Admin</h1>
        <div className={styles.searchContainer}>
          <Input
            name="keyword"
            type="text"
            value={searchForm.keyword}
            placeholder="名前やメールアドレスを入力してください"
            onChange={handleChange}
          />
          <select name="gender" value={searchForm.gender} onChange={handleChange}>
            <option value="">性別</option>
            <option value="1">男性</option>
            <option value="2">女性</option>
            <option value="3">その他</option>
          </select>
          <select name="category" value={searchForm.category} onChange={handleChange}>
            <option value="">お問い合わせの種類</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.content}
              </option>
            ))}
          </select>
          <Input type="date" name="date" value={searchForm.date} onChange={handleChange} />
          <Button onClick={handleSearchWithReset} variant="primary" size="medium" className={styles.searchBtn}>
            検索
          </Button>
          <Button onClick={handleResetWithPage} variant="secondary" size="medium" className={styles.resetBtn}>
            リセット
          </Button>
        </div>

        <div className={styles.exportContainer}>
          <Button onClick={handleExport} variant="export" size="medium" className={styles.exportBtn}>
            エクスポート
          </Button>

          <div className={styles.pagination}>
            <Button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              variant="pagination"
              size="medium"
              className={styles.paginationBtn}
            >
              &lt;
            </Button>
            {(() => {
              // 表示するページネーションの数を5つに制限
              const maxPagesToShow = 5;
              let startPage = 1;
              let endPage = totalPages;

              // ページ数が表示制限より多い場合
              if (totalPages > maxPagesToShow) {
                // 現在のページを中心に表示するよう計算
                const middlePage = Math.floor(maxPagesToShow / 2);

                if (currentPage <= middlePage) {
                  // 現在のページが前半の場合
                  startPage = 1;
                  endPage = maxPagesToShow;
                } else if (currentPage + middlePage >= totalPages) {
                  // 現在のページが後半の場合
                  startPage = totalPages - maxPagesToShow + 1;
                  endPage = totalPages;
                } else {
                  // 現在のページが中央の場合
                  startPage = currentPage - middlePage;
                  endPage = currentPage + middlePage;
                }
              }

              // ページボタンを生成
              return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                const pageNumber = startPage + i;
                return (
                  <Button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    variant={currentPage === pageNumber ? "primary" : "pagination"}
                    size="medium"
                    className={styles.paginationBtn}
                  >
                    {pageNumber}
                  </Button>
                );
              });
            })()}
            <Button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              variant="pagination"
              size="medium"
              className={styles.paginationBtn}
            >
              &gt;
            </Button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>お名前</th>
                <th>性別</th>
                <th>メールアドレス</th>
                <th>お問い合わせの種類</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.first_name}　{item.last_name}
                  </td>
                  <td>{item.gender === 1 ? "男性" : item.gender === 2 ? "女性" : "その他"}</td>
                  <td>{item.email}</td>
                  <td>{getCategoryNameById(Number(item.category_id))}</td>
                  <td>
                    <Button
                      onClick={() => showDetail(item.id)}
                      variant="detail"
                      size="medium"
                      className={styles.detailBtn}
                    >
                      詳細
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 詳細モーダル */}
        {selectedInquiry && (
          <div className={styles.modal} onClick={handleModalClick}>
            <div className={styles.modalContent}>
              <Button
                onClick={() => setSelectedInquiry(null)}
                variant="close"
                size="medium"
                className={styles.modalCloseBtn}
              >
                ×
              </Button>
              {currentItems
                .filter((item) => item.id === selectedInquiry)
                .map((item) => (
                  <div key={item.id} className={styles.inquiryDetail}>
                    <p>
                      <strong>お名前</strong> {item.first_name} {item.last_name}
                    </p>
                    <p>
                      <strong>性別</strong> {item.gender === 1 ? "男性" : item.gender === 2 ? "女性" : "その他"}
                    </p>
                    <p>
                      <strong>メールアドレス</strong> {item.email}
                    </p>
                    <p>
                      <strong>電話番号</strong> {item.tell}
                    </p>
                    <p>
                      <strong>住所</strong> {item.address}
                    </p>
                    <p>
                      <strong>建物名</strong> {item.building}
                    </p>
                    <p>
                      <strong>お問い合わせの種類</strong> {getCategoryNameById(Number(item.category_id))}
                    </p>
                    <p>
                      <strong>お問い合わせ内容</strong> {item.detail}
                    </p>
                    <div className={styles.buttonContainer}>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        variant="delete"
                        size="medium"
                        className={styles.deleteBtn}
                      >
                        削除
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
