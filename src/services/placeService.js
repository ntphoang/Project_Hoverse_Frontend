import axiosClient from "../api/axiosClient";

const placeService = {
  getPlaceByConditions: async (page, appliedFilter, PAGE_SIZE) => {
    const response = await axiosClient.get("/places", {
      params: {
        ...appliedFilter,
        page: page,
        size: PAGE_SIZE,
      },
    });
    return response;
  },

  createPlace: async (placeData, files) => {
    const formData = new FormData();

    formData.append(
      "place",
      new Blob([JSON.stringify(placeData)], { type: "application/json" }),
    );

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await axiosClient.post("/places", formData);
    return response;
  },

  getPlaceDetail: async (placeId) => {
    const response = await axiosClient.get(`/places/${placeId}`);
    return response;
  },
};

export default placeService;
