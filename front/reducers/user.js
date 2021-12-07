export const initialState = {
  isLoggedIn: false,
  isLoggingIn: false, // 로그인 시도중, 시도 중이면 로깅창 띄움
  isLoggingOut: false, // 로그아웃 시도중
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data,
  };
};

export const logoutRequestAction = (data) => {
  return {
    type: 'LOG_OUT_REQUEST',
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_REQUEST':
      console.log('reducer login 실행');
      return {
        ...state,
        isLoggingIn: true,
      };
    case 'LOG_IN_SUCCESS':
      console.log('reducer login 실행2');
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: 'hilda' },
      };
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
        me: null,
      };
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};

export default reducer;
