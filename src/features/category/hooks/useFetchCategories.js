import categoryService from "../services/categoryService";
import { useQuery } from "@tanstack/react-query";

const useFetchCategories = (params = {}) => {
  return useQuery({
    queryKey: ["categories", params],

    queryFn: async () => {
      return await categoryService.getCategoryByConditions(params);
    },
  });
};

export default useFetchCategories;
