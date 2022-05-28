import {axiosInstanceTvMaze} from '@/axiosInstance';
import {Series} from "@/interfaces/Series";
import {Season} from "@/interfaces/Season";
import {Episode} from "@/interfaces/Episode";

const getSeriesWithPagination = () => {
    return axiosInstanceTvMaze.get<unknown, Series[] | []>(`/shows`);
}

const getSeriesDetails = (id: string) => {
    return axiosInstanceTvMaze.get<unknown, Series>(`/shows/${id}`);
}

const getSeasonList = (id: string) => {
    return axiosInstanceTvMaze.get<unknown, Season[]>(`/shows/${id}/seasons`);
}

const getEpisodesList = (id: string) => {
    return axiosInstanceTvMaze.get<unknown, Episode[]>(`/seasons/${id}/episodes`);
}

export {getSeriesWithPagination,getSeriesDetails, getSeasonList, getEpisodesList}
