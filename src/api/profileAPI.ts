import {photosType, profileType} from "../types/types";
import {instance, responseType} from "./api";

type responsePhotoType = {
  photos: photosType
}

export const profileAPI = {
  getProfileUserID(userID: number) {
    return instance.get<profileType>(`profile/${userID}`).then(r => r.data);
  },
  getStatusUserID(userID: number) {
    return instance.get<string>(`profile/status/${userID}`).then(r => r.data);
  },
  putStatus(status: string) {
    let body = {status: status};
    return instance.put<responseType>(`profile/status`, body).then(r => r.data);
  },
  putPhoto(photoFile: any) {
    let formData = new FormData();
    formData.append("image", photoFile);
    return instance.put<responseType<responsePhotoType>>(`profile/photo`, formData).then(r => r.data);
  },
  putProfile(profile: profileType) {
    return instance.put<responseType>(`profile`, profile).then(r => r.data);
  }
}