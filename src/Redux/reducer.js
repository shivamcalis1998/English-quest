import { BOOKS_GET, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./actionTypes";

const initialState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  books: null,
};

const storeReducer = (store = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return { ...store, token: payload.token, role: payload.role };
    case LOGOUT_SUCCESS:
      return { ...store, token: null, role: null };
    case BOOKS_GET:
      return { ...store, books: payload.books };
    default:
      return store;
  }
};
export default storeReducer;
