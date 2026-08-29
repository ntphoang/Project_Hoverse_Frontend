import { useEffect, useState } from "react";
import tagService from "../services/tagService";
import { useQuery } from "@tanstack/react-query";

const useFetchTags = () => {
  return useQuery({
    queryKey: ["tags"],

    queryFn: async () => {
      return await tagService.getAllTags();
    },
  });
};

export default useFetchTags;
