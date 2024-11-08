import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addGuest = async (data) => {
  return await app.post("/guests/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getServiceGuests = async (uuid) => {
  return await app.get(`/guests/service/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getServiceGuestsReport = async (uuid) => {
  return await app.get(`/guests/report/service/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getServiceGuest = async (uuid) => {
  return await app.get(`/guests/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editGroupGuests = async (uuid, data) => {
  return await app.patch(`/guests/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
