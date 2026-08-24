import { useMutation } from "@tanstack/react-query";
import geminiService from "../services/geminiService";

const useRecommendPlace = () => {
  return useMutation({
    mutationFn: async (userPrompt) => {
      return geminiService.recommendPlace(userPrompt);
    },
  });
};

export default useRecommendPlace;
