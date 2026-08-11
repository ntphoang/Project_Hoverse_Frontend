import { useMutation, useQueryClient } from "@tanstack/react-query";
import placeService from "../services/placeService";

const useCreatePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData, files }) => {
      return await placeService.createPlace(formData, files);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });
};

export default useCreatePlace;
