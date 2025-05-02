"use client";

import { useState, useMemo } from "react";
import { Contact } from "@/types/contact";

type PaginationProps = {
  data: Contact[];
  itemsPerPage?: number;
};

export const usePagination = ({ data, itemsPerPage = 7 }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 表示データとページネーション情報を計算
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return {
      totalPages,
      currentItems,
    };
  }, [data, currentPage, itemsPerPage]);

  // ページ変更
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // データ更新時にページをリセット
  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    totalPages: paginationData.totalPages,
    currentItems: paginationData.currentItems,
    handlePageChange,
    resetPage,
  };
};
