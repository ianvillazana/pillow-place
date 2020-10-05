import { createContext } from 'react';

export const CartContext = createContext({
  state: null,
  open: () => {},
  close: () => {}
});
