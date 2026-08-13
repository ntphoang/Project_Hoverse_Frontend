import { useMutation, useQueryClient } from "@tanstack/react-query";
import profileService from "../services/profileService";

const useChangeUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, formData }) => {
      return await profileService.changeUserStatus(userId, formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
};

export default useChangeUserStatus;
