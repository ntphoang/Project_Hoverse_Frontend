import { useQuery } from "@tanstack/react-query";
import tagService from "../services/tagService";

const useAdminTags = ({ isActive }) => {
  return useQuery({
    queryKey: ["admin-tags", isActive],

    queryFn: async () => {
      return await tagService.getAllTags({ isActive });
    },
  });
};

export default useAdminTags;
