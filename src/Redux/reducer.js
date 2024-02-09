import {
  BOOKS_DELETE,
  BOOKS_GET,
  BOOKS_POST,
  BOOKS_PUT,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "./actionTypes";

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
    case BOOKS_POST:
      return { ...store, books: [...store.books, payload.newBooks] };
    case BOOKS_DELETE:
      const updatebooksData = store.books.filter((el) => el._id !== payload.id);
      return { ...store, books: updatebooksData };
    case BOOKS_PUT:
      const updatedBook = store.books.map((el) =>
        el._id === payload.editbook._id ? payload.editbook : el
      );
      return { ...store, books: updatedBook };
    default:
      return store;
  }
};
export default storeReducer;
