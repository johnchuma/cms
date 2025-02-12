import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addContribution = async (data) => {
  return await app.post("/contributions/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getPledgeContributions = async (uuid) => {
  return await app.get(`/contributions/pledge/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getSingleMemberContributions = async (page, limit, keyword) => {
  return await app.get(
    `/contributions/member/?page=${page}&limit=${limit}&keyword=${keyword}`,
    {
      headers: {
        Authorization: getAccessToken(),
      },
    }
  );
};

export const getContribution = async (uuid) => {
  return await app.get(`/contributions/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const editContribution = async (uuid, data) => {
  return await app.patch(`/contributions/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
