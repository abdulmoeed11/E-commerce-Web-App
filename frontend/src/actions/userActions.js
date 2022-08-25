import axios from "axios";
import { BACKURL } from "../constants/url";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${BACKURL}/api/users/login`,
      { email, password },
      config
    );
    console.log(data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("userInfo");
};
