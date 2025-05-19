"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export type Category = {
  id: number;
  content: string;
};

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("カテゴリー取得エラー:", err);
      }
    };

    fetchCategories();
  }, []);

  return { categories };
};
