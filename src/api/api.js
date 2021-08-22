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
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(r => r.data);
  }
}

export const authAPI = {
  getAuth() {
    return instance.get(`auth/me`).then(r => r.data);
  },
  postLogin(email, password, rememberMe = false) {
    let body = {email, password, rememberMe};
    return instance.post(`auth/login`, body).then(r => r.data);
  },
  deleteLogin() {
    return instance.delete(`auth/login`).then(r => r.data);
  }
}

export const profileAPI = {
  getProfileUserID(userID) {
    return instance.get(`profile/${userID}`).then(r => r.data);
  },
  getStatusUserID(userID) {
    return instance.get(`profile/status/${userID}`).then(r => r.data);
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