import { useMutation, useQueryClient } from "@tanstack/react-query";
import placeService from "../services/placeService";

const useCreatePlaceByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ request, files }) =>
      placeService.createPlaceByAdmin(request, files),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["places"],
      });
    },
  });
};

export default useCreatePlaceByAdmin;
