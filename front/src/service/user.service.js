import axios from "axios";
import authHeader from "./auth-header";
const API_URL =
  "http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/";
// 'http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/';

const getPlayList = () => {
  return axios.get(API_URL + "playlist/", { headers: authHeader() });
};
const postPlayList = async (list_name, video_data_id) => {
  return axios.post(
    API_URL + "playlist/",
    { list_name, video_data_id },
    { headers: authHeader() }
  );
};
const getSearchLog = () => {
  return axios.get(API_URL + "searchlog/user/", { headers: authHeader() });
};
const postVideoData = async (url) => {
  return axios.post(API_URL + "videodata/", { url }, { headers: authHeader() });
};
const postRating = async (video_data_id, rating) => {
  return axios.post(
    API_URL + "rating/",
    { video_data_id, rating },
    { headers: authHeader() }
  );
};

export default {
  getSearchLog,
  postPlayList,
  getPlayList,
  postVideoData,
  postRating,
};
