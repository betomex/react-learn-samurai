import {getItemsType, instance} from "./api";

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10, term = "", friend: null | boolean = null) {
    return instance.get<getItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? "" : `&friend=${friend}`)).then(r => r.data);
  }
}