const initState = {
  mode: 0,
};

const modeReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return state;
  }
};
export default modeReducer;
