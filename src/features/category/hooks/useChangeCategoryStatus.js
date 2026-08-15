import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryService from "../services/categoryService";

const useChangeCategoryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId) => {
      return await categoryService.changeCategoryStatus(categoryId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    },
  });
};

export default useChangeCategoryStatus;
