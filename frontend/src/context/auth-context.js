import { createContext } from 'react';

export const AuthContext = createContext({
  show: false,
  isLogin: true,
  isLoggedIn: false, 
  userId: null,
  login: () => {}, 
  logout: () => {} 
});
