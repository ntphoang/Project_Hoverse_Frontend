import { useQuery } from "@tanstack/react-query";
import categoryService from "../services/categoryService";

const useAdminCategories = ({ isActive }) => {
  return useQuery({
    queryKey: ["admin-categories", isActive],

    queryFn: async () => {
      return await categoryService.getCategoryByConditions({ isActive });
    },
  });
};

export default useAdminCategories;
