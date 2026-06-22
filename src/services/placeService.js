import axiosClient from "../api/axiosClient";

const placeService = {
  getAllPlaces: async () => {
    const response = await axiosClient.get("/places");
    return response;
  },

  createPlace: async (placeData) => {
    const response = await axiosClient.post("/places", placeData);
    return response;
  },

  getPlaceDetail: async (placeId) =>{
    const response = await axiosClient.get(`/places/${placeId}`);
    return response;
  }
};

export default placeService;
