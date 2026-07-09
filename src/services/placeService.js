import axiosClient from "../api/axiosClient";

const placeService = {
  getPlaceByConditions: async (title, minRating, page, size) => {
    const response = await axiosClient.get("/places", {
      params: {
        title: title,
        minRating: minRating,
        page: page,
        size: size,
      },
    });
    return response;
  },

  createPlace: async (placeData,files) => {
    const formData = new FormData();

    formData.append(
      "place",
      new Blob(
        [JSON.stringify(placeData)],
        {type: "application/json"}
      )
    );

    files.forEach(file=>{
      formData.append("files",file);
    })

    const response = await axiosClient.post("/places", formData);
    return response;
  },

  getPlaceDetail: async (placeId) => {
    const response = await axiosClient.get(`/places/${placeId}`);
    return response;
  },
};

export default placeService;
