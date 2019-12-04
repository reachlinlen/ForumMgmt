const reducer = (state = { auth: false }, action) => {
  switch (action.type) {
    case 'AUTHENTICATION': {
      return Object.assign({}, state, { auth: action.payload });
    }
    default:
      return state;
  }
};

export default reducer;
