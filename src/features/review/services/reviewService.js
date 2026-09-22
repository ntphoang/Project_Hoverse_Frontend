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
        sort: "createdAt,desc",
      },
    });
    return response;
  },

  getReviewsByConditions: async (conditions, page) => {
    const response = await axiosClient.get("/places/admin/reviews", {
      params: {
        ...conditions,
        page,
        size: 10,
        sort: "createdAt,desc",
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

  changeReviewStatus: async (reviewId, formData) => {
    const response = await axiosClient.patch(
      `/places/admin/reviews/${reviewId}/status`,
      formData,
    );
    return response;
  },
};

export default reviewService;
