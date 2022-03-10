import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8000/api/';


const getPlayList = () => {
    return axios.get(API_URL + "playlist/",{ headers: authHeader()});
  };
const postPlayList=async (list_name, video_data_id) => {
    return axios.post(API_URL + "playlist/",
    {list_name, video_data_id},{ headers: authHeader()});
};
const getSearchLog = () => {
    return axios.get(API_URL + "searchlog/user/", { headers: authHeader()});
  };

export default {
    getSearchLog,
    postPlayList,
    getPlayList,
};