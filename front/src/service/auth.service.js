import axios from "axios";
const API_URL =
  "http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/rest-auth/";

// "http://elice-kdt-3rd-team04.koreacentral.cloudapp.azure.com:5000/api/rest-auth/";

const login = async (email, password) => {
  const response = await axios.post(API_URL + "login/", {
    email,
    password,
  });
  if (response.data.key) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
};

const logout = async () => {
  await axios.post(API_URL + "logout/", {}).then(function () {
    localStorage.removeItem("user"); //로컬 스토리지에서 제거
    window.location.replace("./home"); //페이지 리로드
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  login,
  logout,
  getCurrentUser,
};
