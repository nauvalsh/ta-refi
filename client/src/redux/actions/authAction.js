import Cookies from 'js-cookie';
import { APIPOS } from '../../utils/axios';
import { LOGIN_FAIL, LOGIN_PENDING, LOGIN_SUCCESS } from '../constants';

export const loginAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_PENDING
    });

    const loginResponse = await APIPOS.post('api/v1/auth/login', data);

    if (loginResponse.data) {
      if (loginResponse.data?.status === 'success') {
        Cookies.set('token', loginResponse.data.data.token.accessToken);
        localStorage.setItem('isLogin', true);
        localStorage.setItem('dataUser', JSON.stringify(loginResponse.data.data.user));
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: loginResponse.data
      });
    }
  } catch (e) {
    console.log(e.response);

    dispatch({
      type: LOGIN_FAIL,
      payload: e.response
    });
  }
};

export const registerAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_PENDING
    });

    const loginResponse = await APIPOS.post('api/v1/auth/register', data);

    if (loginResponse.data) {
      if (loginResponse.data?.status === 'success') {
        Cookies.set('token', loginResponse.data.data.token.accessToken);
        localStorage.setItem('isLogin', true);
        localStorage.setItem('dataUser', JSON.stringify(loginResponse.data.data.user));
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: loginResponse.data
      });
    }
  } catch (e) {
    console.log(e.response);

    dispatch({
      type: LOGIN_FAIL,
      payload: e.response
    });
  }
};
