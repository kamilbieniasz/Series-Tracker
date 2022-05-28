import axios from "axios";

const tvMazeURL = ' https://api.tvmaze.com/';

const headers = {
    'Content-Type': 'text/plain'
};

const axiosInstanceTvMaze = axios.create({
    baseURL: tvMazeURL,
    headers: {
        ...headers
    }
});

axiosInstanceTvMaze.interceptors.response.use(response => {
    return response?.data;
}, error => {
    console.log('error', error);
});

export {axiosInstanceTvMaze};
