"use client";

import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { Contact } from "@/types/contact";

export const useSearchForm = () => {
  const [searchForm, setSearchForm] = useState({
    keyword: "",
    gender: "",
    category: "",
    date: "",
  });
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredData, setFilteredData] = useState<Contact[]>([]);

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/contacts");
        setContacts(res.data);
        setFilteredData(res.data);
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 検索実行
  const handleSearch = () => {
    const filtered = contacts.filter((item) => {
      const fullName = `${item.last_name}${item.first_name}`;
      const keywordMatch =
        !searchForm.keyword || fullName.includes(searchForm.keyword) || item.email.includes(searchForm.keyword);
      const genderMatch = !searchForm.gender || item.gender === parseInt(searchForm.gender);
      const categoryMatch = !searchForm.category || item.category_id === parseInt(searchForm.category);
      const dateMatch = true; // 日付検索は未実装

      return keywordMatch && genderMatch && categoryMatch && dateMatch;
    });

    setFilteredData(filtered);
    return filtered; // 検索結果を返す
  };

  // リセット処理
  const resetForm = () => {
    setSearchForm({
      keyword: "",
      gender: "",
      category: "",
      date: "",
    });
    setFilteredData(contacts);
    return contacts; // リセット後のデータを返す
  };

  return {
    searchForm,
    handleChange,
    contacts,
    filteredData,
    handleSearch,
    resetForm,
  };
};
