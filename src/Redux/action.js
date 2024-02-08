import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  BOOKS_GET,
  BOOKS_POST,
  BOOKS_PUT,
  BOOKS_DELETE,
} from "./actionTypes";

import axios from "axios";

export const signup = (data) => async (dispatch) => {
  try {
    await axios.post(`https://english-quest-back.onrender.com/signup`, data);
  } catch (error) {
    console.log(error);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const loginp = await axios.post(
      `https://english-quest-back.onrender.com/login`,
      data
    );

    localStorage.setItem("token", loginp.data.token);
    localStorage.setItem("role", loginp.data.role);
    localStorage.setItem("userId", loginp.data.userId);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: loginp.data.token,
        role: loginp.data.role,
        userId: loginp.data.userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  } catch (error) {
    console.log(error);
  }
};

export const getBooksData = (token) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://english-quest-back.onrender.com/books`,
      {
        headers: {
          "Content-Type": "application/json",
          authentication: token,
        },
      }
    );

    dispatch({
      type: BOOKS_GET,
      payload: { books: response.data.books },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createBooksData = (bookData, token) => async (dispatch) => {
  try {
    const postData = await axios.post(
      `https://english-quest-back.onrender.com/books`,
      bookData,
      {
        headers: {
          authentication: token,
        },
      }
    );

    dispatch({
      type: BOOKS_POST,
      payload: { newBooks: postData.data.books },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = (token, id) => async (dispatch) => {
  try {
    const deleteData = await axios.delete(
      `https://english-quest-back.onrender.com/books/${id}`,

      {
        headers: {
          authentication: token,
        },
      }
    );

    dispatch({
      type: BOOKS_DELETE,
      payload: { id },
    });
  } catch (error) {}
};
