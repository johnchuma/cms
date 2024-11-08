import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addTithing = async (data) => {
  return await app.post("/tithings/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getTithings = async (uuid) => {
  return await app.get(`/tithings/church/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getMemberTithings = async (uuid) => {
  return await app.get(`/tithings/member/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getTithing = async (uuid) => {
  return await app.get(`/tithings/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editTithing = async (uuid, data) => {
  return await app.patch(`/tithings/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
