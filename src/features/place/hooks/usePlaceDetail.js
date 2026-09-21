import { useEffect, useState } from "react";
import placeService from "../services/placeService";
import { useQuery } from "@tanstack/react-query";

const usePlaceDetail = (placeId) => {
  return useQuery({
    queryKey: ["place-detail", placeId],

    queryFn: async () => {
      return await placeService.getPlaceDetail(placeId);
    },
  });
};

export default usePlaceDetail;
