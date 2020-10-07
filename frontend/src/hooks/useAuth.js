import { useReducer } from 'react';

const initialState = {
  show: false,
  isLogin: true,
  isLoggedIn: false, 
  userId: null,
  login: () => {}, 
  logout: () => {} 
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "OPEN":
      return {
        ...state,
        show: true,
        isLogin: action.isLogin
      }
    case "CLOSE": 
      return {
        ...state,
        show: false,
        isLogin: true
      }
    default: 
      return state;
  }
}

export const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const open = (isLogin = true) => {
    dispatch({ type: "OPEN", isLogin })
  }

  const close = () => {
    dispatch({ type: "CLOSE" });
  }

  return [state, open, close];
}
