import {axiosInstanceTvMaze} from '@/axiosInstance';
import {Series} from "@/interfaces/Series";

const getSeriesWithPagination = (page: number) => {
    return axiosInstanceTvMaze.get<Series[] | []>(`/shows?page=${page}`);
}

const getSeriesDetails = (id: string) => {
    return axiosInstanceTvMaze.get<Series>(`/shows/${id}`);
}

export {getSeriesWithPagination,getSeriesDetails}
