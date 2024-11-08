import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addService = async (data) => {
  return await app.post("/services/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getGroupServices = async (uuid) => {
  return await app.get(`/services/group/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editGroupServices = async (uuid, data) => {
  return await app.patch(`/services/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
