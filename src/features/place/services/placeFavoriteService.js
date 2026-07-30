import axiosClient from "@/api/axiosClient"

const placeFavoriteService = {
    getPlaceFavorite:async()=>{
        const response = await axiosClient.get("/favorites");
        return response;
    }
}

export default placeFavoriteService;