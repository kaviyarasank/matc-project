export const getLocalStorageValues = () => {
  let userData = JSON.parse(localStorage.getItem('name') || '{}');
  return userData;
};

export const getLocalStorageValuesBoolean = () => {
  let userData = JSON.parse(localStorage.getItem('name') || '{}');
  return Object.keys(userData).length > 0 ? true : false;
};
