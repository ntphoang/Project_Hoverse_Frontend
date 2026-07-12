import { useState, useEffect } from "react";
import { categoryService } from "@/features/category";
import { placeService } from "@/features/place";

const PAGE_SIZE = 8;

const usePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [draftFilter, setDraftFilter] = useState({
    title: "",
    minRating: "",
  });

  const [appliedFilter, setAppliedFilter] = useState({
    title: "",
    categoryId: null,
    minRating: "",
  });

  const [loading, setLoading] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories([
        { id: null, name: "Tất cả", iconName: "All" },
        ...response,
      ]);
    } catch (error) {
      console.error("Lỗi khi load category: ", error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        const response = await placeService.getPlaceByConditions(
          page,
          appliedFilter,
          PAGE_SIZE,
        );
        if (page === 0) {
          setPlaces(response.content);
        } else {
          setPlaces((prev) => [...prev, ...response.content]);
        }
        setHasMore(!response.last);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, [page, appliedFilter, refreshTrigger]);

  const handleSearch = () => {
    setAppliedFilter((prev) => ({
      ...prev,
      title: draftFilter.title,
      minRating: draftFilter.minRating,
    }));
    setPage(0);
  };

  const handleReadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleSelectCategory = (categoryId) => {
    setAppliedFilter((prev) => ({ ...prev, categoryId }));
    setPage(0);
  };

  const handlePlaceAdded = () => {
    setPage(0);
    setRefreshTrigger((prev) => prev + 1);
  };

  return {
    places,
    categories,
    draftFilter,
    appliedFilter,
    loading,
    hasMore,
    setDraftFilter,
    handleSearch,
    handleReadMore,
    handleSelectCategory,
    handlePlaceAdded,
  };
};

export default usePlaces;
