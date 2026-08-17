import { useMutation, useQueryClient } from "@tanstack/react-query";
import tagService from "../services/tagService";

const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tagId, formData }) => {
      return await tagService.updateTag({ tagId, formData });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tags"] });
    },
  });
};

export default useUpdateTag;
