const fishReducer = (state, action) => {
  switch (action.type) {
    case "SET_CARDS":
      return {
        ...state,
        fishList: action.payload,
      };
    case "ADD_CARD":
      return {
        ...state,
        fishList: [...state.fishList, action.payload],
      };
    case "REMOVE_CARD":
      return {
        ...state,
        fishList: state.fishList && state.fishList.filter((fish) => fish.id !== action.payload),
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
