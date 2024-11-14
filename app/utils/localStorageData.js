export const storeAccessToken = (data) => {
  localStorage.setItem("cms-token", JSON.stringify(data));
  deleteSelectedChurch();
};

export const getAccessToken = () => {
  const token = localStorage.getItem("cms-token");
  return token != null ? `Bearer ${JSON.parse(token)}` : null;
};

export const deleteAccessToken = () => {
  localStorage.removeItem("cms-token");
  deleteSelectedChurch();
};

export const storeSelectedChurch = (data) => {
  localStorage.setItem("selected-church", JSON.stringify(data));
};
export const deleteSelectedChurch = () => {
  localStorage.removeItem("selected-church");
};

export const getSelectedChurch = () => {
  const token = localStorage.getItem("selected-church");
  return token != null ? JSON.parse(token) : null;
};
