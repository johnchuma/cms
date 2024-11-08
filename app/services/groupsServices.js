import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addGroup = async (data) => {
  return await app.post("/groups/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getGroupDetails = async (uuid, data) => {
  return await app.get(`/groups/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editGroup = async (uuid, data) => {
  return await app.patch(`/groups/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const deleteGroup = async (uuid) => {
  return await app.delete(`/groups/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getChurchGroups = async (uuid) => {
  return await app.get(`/groups/church/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getGroupMembers = async (uuid) => {
  return await app.get(`/group-members/group/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const addGroupMember = async (data) => {
  return await app.post(`/group-members/`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getGroupLeaders = async (uuid) => {
  return await app.get(`/group-leaders/group/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getGroupLeader = async (uuid) => {
  return await app.get(`/group-leaders/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const addGroupLeader = async (data) => {
  return await app.post(`/group-leaders/`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editGroupLeader = async (uuid, data) => {
  return await app.patch(`/group-leaders/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
