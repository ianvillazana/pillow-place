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
    case "ADD_ITEM": {
      const newCart = {...state.items};
      if (!(action.item.sku in newCart)) {
        newCart[action.item.sku] = {
          name: action.item.name,
          price: action.item.price,
          image: action.item.image,
          sku: action.item.sku,
          total: 1
        };
      } else {
        newCart[action.item.sku].total += 1;
      }
      console.log(newCart); //remove
      return {
        ...state,
        show: true,
        items: newCart,
        itemTotal: state.itemTotal + 1,
        priceTotal: parseFloat((state.priceTotal + action.item.price).toFixed(2))
      }
    }
    case "REMOVE_ITEM": {
      const newCart = {...state.items};
      const price = action.item.price;
      if (action.item.total <= 1) {
        delete newCart[action.item.sku];
      } else {
        newCart[action.item.sku].total -= 1;
      }
      console.log(newCart); //remove
      return {
        ...state,
        items: newCart,
        itemTotal: state.itemTotal - 1,
        priceTotal: parseFloat((state.priceTotal - price).toFixed(2))
      }
    }
    case "COMPLETE_ORDER":
      return {
        ...state,
        orderComplete: action.bool
      }
    case "CLEAR":
      return {
        ...initialState,
        orderComplete: state.orderComplete
      }
    default:
      return state;
  }
};

export const useCart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const open = () => {
    dispatch({ type: "OPEN" });
  };

  const close = () => {
    dispatch({ type: "CLOSE" });
  };

  const addItem = (itemObj) => {
    dispatch({ type: "ADD_ITEM", item: itemObj });
  };

  const removeItem = (itemObj) => {
    dispatch({ type: "REMOVE_ITEM", item: itemObj });
  };

  const completeOrder = (bool) => {
    dispatch({ type: "COMPLETE_ORDER", bool });
  };

  const clear = () => {
    dispatch({ type: "CLEAR" });
  };

  return [state, open, close, addItem, removeItem, completeOrder, clear];
};
