import * as axios from "axios";
import avatar from '../assets/images/avatar.png';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "cf7b570a-c9c8-43b8-85da-682ef4236245"
  }
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`);
  }
}

export const authAPI = {
  getAuth() {
    return instance.get(`auth/me`);
  },
  postLogin(email, password, rememberMe = false) {
    let body = {email, password, rememberMe};
    return instance.post(`auth/login`, body);
  },
  deleteLogin() {
    return instance.delete(`auth/login`);
  }
}

export const profileAPI = {
  getProfileUserID(userID) {
    return instance.get(`profile/${userID}`);
  },
  getStatusUserID(userID) {
    return instance.get(`profile/status/${userID}`);
  },
  putStatus(status) {
    let body = {status: status};
    return instance.put(`profile/status`, body);
  },
  putPhoto() {
    let body = {image: avatar}
    return instance.put(`profile/photo`, body);
  }
}

export const followAPI = {
  deleteFollow(userID) {
    return instance.delete(`follow/${userID}`).then(r => r.data);
  },
  postFollow(userID) {
    return instance.post(`follow/${userID}`).then(r => r.data);
  }
}