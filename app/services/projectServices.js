import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addProject = async (data) => {
  return await app.post("/projects/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getGroupProjects = async (uuid) => {
  return await app.get(`/projects/group/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getMemberProjects = async (page, limit, keyword) => {
  return await app.get(
    `/projects/?page=${page}&limit=${limit}&keyword=${keyword}`,
    {
      headers: {
        Authorization: getAccessToken(),
      },
    }
  );
};
export const getSingleMemberProjects = async (page, limit, keyword) => {
  return await app.get(
    `/projects/member/?page=${page}&limit=${limit}&keyword=${keyword}`,
    {
      headers: {
        Authorization: getAccessToken(),
      },
    }
  );
};
export const getGroupProjectsReport = async (uuid) => {
  return await app.get(`/projects/report/group/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getProject = async (uuid) => {
  return await app.get(`/projects/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editProject = async (uuid, data) => {
  return await app.patch(`/projects/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
