export const loadState = (
  key: string,
  defaultValue: any,
  overrideValues?: any
) => {
  try {
    const serializedState = sessionStorage.getItem(key);

    if (serializedState === null) {
      return defaultValue;
    }

    const currentData = JSON.parse(serializedState);

    if (currentData && overrideValues) {
      const newData = {
        ...currentData,
        ...overrideValues,
      };
      localStorage.setItem(key, newData);
      return newData;
    }

    return currentData;
  } catch (error) {
    return defaultValue;
  }
};

export const saveState = (key: string, obj: any) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(obj));
  } catch (error) {}
};
