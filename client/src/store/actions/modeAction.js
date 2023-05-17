export const ChangeMode = (mode) => async (dispatch) =>
  dispatch({
    type: "CHANGE_MODE",
    mode,
  });
