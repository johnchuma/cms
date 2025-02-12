const { getAccessToken } = require("../utils/localStorageData");
const { app } = require("./authServices");

export const getMyChurches = async () => {
  return await app.get("/churches/user", {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const addChurch = async (data) => {
  return await app.post("/churches/", data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};

export const getChurch = async (uuid) => {
  return await app.get(`/churches/${uuid}`);
};
export const editChurch = async (uuid, data) => {
  return await app.patch(`/churches/${uuid}`, data, {
    headers: {
      Authorization: getAccessToken(),
    },
  });
};
