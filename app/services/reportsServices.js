import { getAccessToken } from "../utils/localStorageData";
import { app } from "./authServices";
export const getMembersStats = async (
  uuid,
  year = new Date().getFullYear()
) => {
  return await app.get(`reports/members/church/${uuid}?year=${year}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
export const getSingleMemberStats = async () => {
  return await app.get(`reports/member`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getFinanceReport = async (
  uuid,
  year = new Date().getFullYear()
) => {
  return await app.get(`reports/finance/church/${uuid}?year=${year}`, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
