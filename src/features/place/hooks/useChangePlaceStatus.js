import { useMutation, useQueryClient } from "@tanstack/react-query";
import placeService from "../services/placeService";

const useChangePlaceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ placeId, formData }) => {
      return await placeService.changePlaceStatus(placeId, formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-places"] });
    },
  });
};

export default useChangePlaceStatus;
