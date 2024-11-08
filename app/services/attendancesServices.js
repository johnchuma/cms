import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addAttendance = async (data) => {
  return await app.post("/attendances/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getServiceAttendances = async (uuid) => {
  return await app.get(`/attendances/service/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getAttendanceReports = async (uuid) => {
  return await app.get(`/attendances/report/service/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getServiceAttendance = async (uuid) => {
  return await app.get(`/attendances/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editGroupAttendances = async (uuid, data) => {
  return await app.patch(`/attendances/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
