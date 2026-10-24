import { useEffect, useState } from "react";

const useGpsOfUser = () => {
  const [location, setLocation] = useState({
    latitude: 10.82198,
    longitude: 106.68749,
  });
  const [isGpsLoaded, setIsGpsLoaded] = useState(false);

  const getGpsOfUser = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({ latitude, longitude });
        setIsGpsLoaded(true);
      },
      (error) => {
        console.log("Lỗi lấy vị trí: ", error);
        setIsGpsLoaded(true);
      },
    );
  };

  useEffect(() => {
    getGpsOfUser();
  }, []);

  return { location, isGpsLoaded, getGpsOfUser };
};

export default useGpsOfUser;
