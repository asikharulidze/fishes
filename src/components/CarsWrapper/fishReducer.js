const fishReducer = (state, action) => {
  switch (action.type) {
    case "SET_CARDS":
      return {
        ...state,
        carsList: action.payload,
      };
    case "ADD_CARD":
      return {
        ...state,
        carsList: [...state.carsList, action.payload],
      };
    case "REMOVE_CARD":
      return {
        ...state,
        carsList: state.carsList.filter((fish) => fish.id !== action.payload),
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default fishReducer;
