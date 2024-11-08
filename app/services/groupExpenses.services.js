import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addGroupExpense = async (data) => {
  return await app.post("/group-expenses/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getGroupExpenses = async (uuid) => {
  return await app.get(`/group-expenses/group/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getGroupExpensesReport = async (uuid) => {
  return await app.get(`/group-expenses/report/group/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getGroupExpense = async (uuid) => {
  return await app.get(`/group-expenses/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editGroupExpenses = async (uuid, data) => {
  return await app.patch(`/group-expenses/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
