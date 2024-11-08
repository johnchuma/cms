import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addGroupCalender = async (data) => {
  return await app.post("/group-calender/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getGroupCalenders = async (uuid) => {
  return await app.get(`/group-calender/group/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getChurchCalenders = async (uuid) => {
  return await app.get(`/group-calender/church/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getGroupCalender = async (uuid) => {
  return await app.get(`/group-calender/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editGroupCalenders = async (uuid, data) => {
  return await app.patch(`/group-calender/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
