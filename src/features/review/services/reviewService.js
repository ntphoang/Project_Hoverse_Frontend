import axiosClient from "@/api/axiosClient";

const reviewService = {
  createReview: async (placeId, formData) => {
    const response = await axiosClient.post(
      `/places/${placeId}/reviews`,
      formData,
    );
    return response;
  },

  getReviewsByPlace: async (placeId, page = 0, size = 5) => {
    const response = await axiosClient.get(`/places/${placeId}/reviews`, {
      params: {
        page: page,
        size: size,
      },
    });
    return response;
  },

  updateReview: async (formData, reviewId) => {
    const response = await axiosClient.patch(
      `/places/reviews/${reviewId}`,
      formData,
    );
    return response;
  },

  deleteReview: async (reviewId) => {
    const response = await axiosClient.delete(`/places/reviews/${reviewId}`);
    return response;
  },
};

export default reviewService;
