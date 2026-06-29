import axiosClient from "../api/axiosClient";

const reviewService = {
  createReview: async (placeId, reviewData) => {
    const response = await axiosClient.post(
      `/places/${placeId}/reviews`,
      reviewData,
    );
    return response;
  },
  getReviewsByPlace: async (placeId, page=0, size=5) => {
    const response = await axiosClient.get(`/places/${placeId}/reviews`, {
      params: {
        page: page,
        size: size,
      },
    });
    return response;
  },
};

export default reviewService;
