"use client";

import { useState, ChangeEvent } from "react";
import { ContactAdmin } from "@/types/contactAdmin";

type SearchFormState = {
  keyword: string;
  gender: string;
  category: string;
  date: string;
};

export const useSearchForm = (initialData: ContactAdmin[]) => {
  const [searchForm, setSearchForm] = useState<SearchFormState>({
    keyword: "",
    gender: "",
    category: "",
    date: "",
  });
  const [filteredData, setFilteredData] = useState<ContactAdmin[]>(initialData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (data: ContactAdmin[]) => {
    const filtered = data.filter((item) => {
      const fullName = `${item.last_name}${item.first_name}`;
      const keywordMatch =
        !searchForm.keyword || fullName.includes(searchForm.keyword) || item.email.includes(searchForm.keyword);
      const genderMatch = !searchForm.gender || item.gender === parseInt(searchForm.gender);
      const categoryMatch = !searchForm.category || item.category_id === parseInt(searchForm.category);
      const dateMatch = true; // 日付検索は未実装

      return keywordMatch && genderMatch && categoryMatch && dateMatch;
    });

    setFilteredData(filtered);
    return filtered;
  };

  const resetForm = (data: ContactAdmin[]) => {
    setSearchForm({
      keyword: "",
      gender: "",
      category: "",
      date: "",
    });
    setFilteredData(data);
    return data;
  };

  return {
    searchForm,
    handleChange,
    filteredData,
    handleSearch,
    resetForm,
  };
};
