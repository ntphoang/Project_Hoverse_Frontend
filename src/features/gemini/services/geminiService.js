import axiosClient from "@/api/axiosClient";

const geminiService = {
  recommendPlace: async (userPrompt) => {
    const response = await axiosClient.get("/ai/recommend", {
      params: { prompt: userPrompt },
    });
    return response;
  },
};

export default geminiService;
