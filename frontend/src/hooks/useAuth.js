import { useReducer } from 'react';

const initialState = {
  show: false,
  isLogin: true,
  user: { id: null, email: null, name: null },
  token: null
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
    case "LOGIN":
      return {
        ...state,
        show: false,
        user: { id: action.id, email: action.email, name: action.name },
        token: action.token
      }
    case "LOGOUT":
      return {
        ...initialState
      }
    default: 
      return state;
  }
}

export const useAuth = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const open = (isLogin = true) => {
    dispatch({ type: "OPEN", isLogin })
  };

  const close = () => {
    dispatch({ type: "CLOSE" });
  };

  const login = (id, email, name, token) => {
    dispatch({ type: "LOGIN", id, email, name, token });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return { state, open, close, login, logout };
}
