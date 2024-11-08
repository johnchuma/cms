import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addMemberReport = async (data) => {
  return await app.post("/member-reports/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getMemberReportDetails = async (uuid, data) => {
  return await app.get(`/member-reports/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editMemberReport = async (uuid, data) => {
  return await app.patch(`/member-reports/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const deleteMemberReport = async (uuid) => {
  return await app.delete(`/member-reports/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getChurchMemberReports = async (uuid) => {
  return await app.get(`/member-reports/church/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getMemberReports = async (uuid) => {
  return await app.get(`/member-reports/member/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
