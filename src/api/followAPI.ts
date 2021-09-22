import {instance, responseType} from "./api";

export const followAPI = {
  deleteFollow(userID: number) {
    return instance.delete<responseType>(`follow/${userID}`).then(r => r.data);
  },
  postFollow(userID: number) {
    return instance.post<responseType>(`follow/${userID}`).then(r => r.data);
  }
}