import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePlaceFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Vì URL chỉ chứa chuỗi nên các thông tin như category và tag phải map về dạng số
  const appliedFilter = useMemo(
    () => ({
      title: searchParams.get("title") || "",
      categoryId: searchParams.get("categoryId")
        ? Number(searchParams.get("categoryId"))
        : null,
      minRating: searchParams.get("minRating") || "",
      tags: searchParams.get("tags")
        ? searchParams.get("tags").split(",").map(Number)
        : [],
      sort: searchParams.get("sort") || "createdAt,desc",
    }),
    [searchParams],
  );

  const [draftFilter, setDraftFilter] = useState({
    title: appliedFilter.title,
  });

  // Hàm xử lý khi ấn nút Search
  const handleSearch = () => {
    const newParams = Object.fromEntries([...searchParams]);
    newParams.title = draftFilter.title;

    if (!newParams.title) delete newParams.title;

    setSearchParams(newParams);
  };

  // Hàm xử lý khi chọn category
  const handleSelectCategory = (categoryId) => {
    const newParams = Object.fromEntries([...searchParams]);

    if (categoryId) newParams.categoryId = categoryId;
    else delete newParams.categoryId;

    setSearchParams(newParams);
  };

  // Hàm xử lý khi chọn tag
  const handleToggleTag = (tagId) => {
    const newParams = Object.fromEntries([...searchParams]);

    const oldTags = newParams.tags ? newParams.tags.split(",").map(Number) : [];

    let newTags;
    if (oldTags.includes(tagId)) {
      newTags = oldTags.filter((id) => id !== tagId);
    } else {
      newTags = [...oldTags, tagId];
    }

    if (newTags.length > 0) {
      newParams.tags = newTags.join(",");
    } else {
      delete newParams.tags;
    }

    setSearchParams(newParams);
  };

  // Hàm xử lý chọn sort
  const handleSelectSort = (sortValue) => {
    const newParams = Object.fromEntries([...searchParams]);

    if (sortValue && sortValue !== "createdAt,desc") {
      newParams.sort = sortValue;
    } else {
      delete newParams.sort;
    }

    setSearchParams(newParams);
  };

  const handleSelectMinRating = (ratingValue) => {
    const newParams = Object.fromEntries([...searchParams]);

    if (ratingValue && ratingValue != null) {
      newParams.minRating = ratingValue;
    } else {
      delete newParams.minRating;
    }

    setSearchParams(newParams);
  };

  return {
    appliedFilter,
    draftFilter,
    setDraftFilter,
    handleSearch,
    handleSelectCategory,
    handleToggleTag,
    handleSelectSort,
    handleSelectMinRating
  };
};

export default usePlaceFilter;
