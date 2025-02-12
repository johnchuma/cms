import moment from "moment";
import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addMember = async (data) => {
  return await app.post("/members/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const loginMember = async (data) => {
  return await app.post("/members/auth/login", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getMemberDetails = async (uuid, data) => {
  return await app.get(`/members/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editMember = async (uuid, data) => {
  return await app.patch(`/members/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const deleteMember = async (uuid) => {
  return await app.delete(`/members/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getChurchMembers = async (uuid) => {
  return await app.get(`/members/church/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getMemberCount = async (uuid) => {
  return await app.get(`/members/count/church/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
