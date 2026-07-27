import { useEffect, useState } from "react";
import placeService from "../services/placeService";

const usePlaceDetail = (placeId) => {
  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlace = async (placeId) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await placeService.getPlaceDetail(placeId);
      setPlace(response);
    } catch (err) {
      setError("Có lỗi khi tải chi tiết địa điểm " + err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlace(placeId);
  }, [placeId]);

  return { place, isLoading, error };
};

export default usePlaceDetail;
