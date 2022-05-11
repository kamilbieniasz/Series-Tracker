import {axiosInstanceTvMaze} from '@/axiosInstance';
import {Series} from "@/interfaces/Series";

const getSeriesWithPagination = () => {
    return axiosInstanceTvMaze.get<unknown, Series[] | []>(`/shows`);
}

const getSeriesDetails = (id: string) => {
    return axiosInstanceTvMaze.get<unknown, Series>(`/shows/${id}`);
}

export {getSeriesWithPagination,getSeriesDetails}
