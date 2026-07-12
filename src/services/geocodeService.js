import axiosClient from "@/api/axiosClient";

const geocodeService = {
  reverseGeocode: async (latitude, longitude) => {
    const response = await axiosClient.get("/reverse", {
      params: {
        latitude: latitude,
        longitude: longitude,
      },
    });
    return response;
  },
};

export default geocodeService;
