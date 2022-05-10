import {axiosInstanceTvMaze} from '@/axiosInstance';

const getSeriesWithPagination = (page: number) => {
    return axiosInstanceTvMaze.get(`https://api.tvmaze.com/shows?page=${page}`);
}

export {getSeriesWithPagination}
