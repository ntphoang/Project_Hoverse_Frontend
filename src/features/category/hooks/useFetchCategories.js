import { useEffect, useState } from "react";
import categoryService from "../services/categoryService";

const useFetchCategories = () => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await categoryService.getCategoryByConditions();
      setCategories(response);
    } catch (error) {
      setError("Có lỗi khi tải danh mục " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};

export default useFetchCategories;
