import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addPledge = async (data) => {
  return await app.post("/pledges/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getProjectPledges = async (uuid) => {
  return await app.get(`/pledges/project/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getMemberPledges = async (uuid) => {
  return await app.get(`/pledges/member/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getProjectPledgesReport = async (uuid) => {
  return await app.get(`/pledges/report/project/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getPledge = async (uuid) => {
  return await app.get(`/pledges/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const editPledge = async (uuid, data) => {
  return await app.patch(`/pledges/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
