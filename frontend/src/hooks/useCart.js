import { useReducer } from 'react';

const initialState = {
  show: false,
  items: {},
  itemTotal: 0,
  priceTotal: 0,
  orderComplete: false
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "OPEN": 
      return {
        ...state,
        show: true
      };
    case "CLOSE":
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
};

export const useCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const open = () => {
    dispatch({ type: "OPEN" });
    console.log("Opening cart.");
  }

  const close = () => {
    dispatch({ type: "CLOSE" });
    console.log("Closing cart.");
  }

  return [state, open, close];
}
