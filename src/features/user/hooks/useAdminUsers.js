import { useQuery } from "@tanstack/react-query";
import profileService from "../services/profileService";

const useAdminUsers = ({ tab, page }) => {
  return useQuery({
    queryKey: ["admin-users", tab, page],

    queryFn: async () => {
      return await profileService.getUserByConditions(
        page,
        { status: tab.toUpperCase() },
        10,
      );
    },
  });
};

export default useAdminUsers;
