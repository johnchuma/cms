export const storeAccessToken = (data) => {
  localStorage.setItem("cms-token", JSON.stringify(data));
};

export const getAccessToken = () => {
  const token = localStorage.getItem("cms-token");
  return token != null ? `Bearer ${JSON.parse(token)}` : null;
};
