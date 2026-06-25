import axiosClient from "../api/axiosClient";

const reviewService = {
  createReview: async (placeId, reviewData) => {
    const response = await axiosClient.post(`/places/${placeId}/reviews`, reviewData);
    return response;
  },
};

export default reviewService;
