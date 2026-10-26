import tagService from "../services/tagService";
import { useQuery } from "@tanstack/react-query";

const useFetchTags = (params = {}) => {
  return useQuery({
    queryKey: ["tags", params],

    queryFn: async () => {
      return await tagService.getTagsByCondition(params);
    },
  });
};

export default useFetchTags;
