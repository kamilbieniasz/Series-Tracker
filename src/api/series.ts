import {axiosInstanceTvMaze} from '@/axiosInstance';
import {Series} from "@/interfaces/Series";
import {Season} from "@/interfaces/Season";

const getSeriesWithPagination = () => {
    return axiosInstanceTvMaze.get<unknown, Series[] | []>(`/shows`);
}

const getSeriesDetails = (id: string) => {
    return axiosInstanceTvMaze.get<unknown, Series>(`/shows/${id}`);
}

const getSeasonList = (id: string) => {
    return axiosInstanceTvMaze.get<unknown, Season[]>(`/shows/${id}/seasons`);
}

export {getSeriesWithPagination,getSeriesDetails, getSeasonList}
