export const changeFilterObject = (filters) => {
  const { enabled, ...restFilter } = filters;
  const params = {};
  Object.entries(restFilter).forEach(([key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      params[key] = value;
    }
  });
  return params;
};
