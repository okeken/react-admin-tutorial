// src/components/authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from "react-admin";
import axios from "axios";
import { baseUrl } from "./env";

export const authProvider = async (type, params) => {
  // when a user tries to log in
  if (type === AUTH_LOGIN) {
    const { email, password } = params;
    return axios
      .post(`${baseUrl}login`, {
        email,
        password,
      })
      .then(({ data }) => {
        localStorage.setItem("authToken", data.accessToken);
        return data;
      })
      .catch((e) => e);
  }
  // when a user tries to logout
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("authToken");
    return Promise.resolve();
  }
  // when the API throws an error
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      localStorage.removeItem("authToken");
      return Promise.reject();
    }
    return Promise.resolve();
  }
  // when a user navigates to a new location
  if (type === AUTH_CHECK) {
    return localStorage.getItem("authToken")
      ? Promise.resolve()
      : Promise.reject();
  }

  return Promise.reject("Unknown Method");
};
