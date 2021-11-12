const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  };
};

export const loginoutAction = (data) => {
  return {
    type: 'LOG_OUT',
  };
};

const changeNickname = (data) => {
  return {
    type: 'CHANGE_NICKNAME',
    data,
  };
};

store.dispatch(changeNickname('hilda'));

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        },
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        },
      };
  }
};

export default rootReducer;
