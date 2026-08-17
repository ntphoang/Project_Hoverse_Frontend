import { useMutation, useQueryClient } from "@tanstack/react-query";
import tagService from "../services/tagService";

const useChangeTagStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tagId }) => {
      return await tagService.changeTagStatus({ tagId });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tags"] });
    },
  });
};

export default useChangeTagStatus;
