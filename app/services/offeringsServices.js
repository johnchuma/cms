import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addOffering = async (data) => {
  return await app.post("/offerings/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getServiceOfferings = async (uuid) => {
  return await app.get(`/offerings/service/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getOffering = async (uuid) => {
  return await app.get(`/offerings/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editOffering = async (uuid, data) => {
  return await app.patch(`/offerings/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
