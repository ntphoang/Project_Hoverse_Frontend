import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryService from "../services/categoryService";

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categoryId, formData }) => {
      return await categoryService.updateCategory(categoryId, formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
  });
};

export default useUpdateCategory;
