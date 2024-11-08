import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";

export const addProjectExpense = async (data) => {
  return await app.post("/project-expenses/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getProjectExpenses = async (uuid) => {
  return await app.get(`/project-expenses/project/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getProjectExpensesReport = async (uuid) => {
  return await app.get(`/project-expenses/report/project/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getProjectExpense = async (uuid) => {
  return await app.get(`/project-expenses/${uuid}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const editProjectExpense = async (uuid, data) => {
  return await app.patch(`/project-expenses/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
