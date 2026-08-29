import categoryService from "../services/categoryService";
import { useQuery } from "@tanstack/react-query";

const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      return await categoryService.getCategoryByConditions();
    },
  });
};

export default useFetchCategories;
