import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8000/api/';


const getPlayList = () => {
    return axios.get(API_URL + "playlist/",{ headers: authHeader()});
  };
  const getRecentVideo = () => {
    return axios.get(API_URL + "videodata/", { headers: authHeader()});
  };

export default {
    getRecentVideo,
    getPlayList
};