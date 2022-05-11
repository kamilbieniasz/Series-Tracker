import {axiosInstanceTvMaze} from '@/axiosInstance';
import {Series} from "@/interfaces/Series";

const getSeriesWithPagination = (page: number) => {
    return axiosInstanceTvMaze.get<Series[] | []>(`https://api.tvmaze.com/shows?page=${page}`);
}

export {getSeriesWithPagination}
