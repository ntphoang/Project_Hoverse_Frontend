import { useQuery } from "@tanstack/react-query";
import profileService from "../services/profileService";

const useCountUserByMonth = (year) => {
  return useQuery({
    queryKey: ["count-users", year],

    queryFn: async () => {
      return await profileService.countUserGroupByMonth(year);
    },
  });
};

export default useCountUserByMonth;
