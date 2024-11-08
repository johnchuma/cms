import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addOfferingRecords = async (data) => {
  return await app.post("/offering-records/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getOfferingRecords = async (uuid) => {
  return await app.get(`/offering-records/offering/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getOfferingRecordsReport = async (uuid) => {
  return await app.get(`/offering-records/report/offering/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getOfferingRecord = async (uuid) => {
  return await app.get(`/offering-records/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editOfferingRecord = async (uuid, data) => {
  return await app.patch(`/offering-records/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
