import axiosClient from "./AxiosClient";

const placeService = {
  getAllPlaces: async () => {
    const response = await axiosClient.get("/places");
    return response.data;
  },

  createPlace: async (placeData) => {
    const response = await axiosClient.post("/places", placeData);
    return response.data;
  },
};

export default placeService;
