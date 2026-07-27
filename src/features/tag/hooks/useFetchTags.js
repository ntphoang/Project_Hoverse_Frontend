import { useEffect, useState } from "react";
import tagService from "../services/tagService";

const useFetchTags = () => {
  const [tags, setTags] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTags = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await tagService.getAllTags();
      setTags(response);
    } catch (error) {
      setError("Có lỗi khi tải tag " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return { tags, isLoading, error };
};

export default useFetchTags;
