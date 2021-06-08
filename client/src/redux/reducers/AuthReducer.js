import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAIL } from '../constants';

const initialState = {
  login: {},
  loading: false,
  error: null,
};

const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_PENDING:
      return {
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        login: payload,
        loading: false,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
