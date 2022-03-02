import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/rest-auth/";
class AuthService {

  //POST {username, password} & save JWT to Local Storage
  async login(email, password) {
    const response = await axios
          .post(API_URL + "login/", {
              email,
              password
          });
      if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log(JSON.stringify(response.data));
        }
      return response.data;
  }
  //remove JWT from Local Storage
  logout() {
    localStorage.removeItem("user");
  }

  //get stored user information (including JWT)
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();