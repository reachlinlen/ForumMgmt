const reducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case 'AUTHENTICATION': {
      return Object.assign(...state.data, { auth: action.data });
    }
    default:
      return state;
  }
};

export default reducer;
