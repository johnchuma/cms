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
