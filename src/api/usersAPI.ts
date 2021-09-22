import {getItemsType, instance} from "./api";

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get<getItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(r => r.data);
  }
}