export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("accessToken");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("accessToken", serializedState);
  } catch (error) {
    // Ignore write errors.
  }
};
