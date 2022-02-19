import produce from 'immer';

export const initialState = {
  weatherCallLoading: false,
  weatherCallDone: false,
  weatherCallError: null,
  weatherInfo: []
};

export const CALL_WEATHER_REQUEST = 'CALL_WEATHER_REQUEST';
export const CALL_WEATHER_SUCCESS = 'CALL_WEATHER_SUCCESS';
export const CALL_WEATHER_FAILURE = 'CALL_WEATHER_FAILURE';

export const callWeatherRequestAction = data => {
  return {
    type: CALL_WEATHER_REQUEST,
    data
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case CALL_WEATHER_REQUEST:
        draft.weatherCallLoading = true;
        draft.weatherCallDone = false;
        break;
      case CALL_WEATHER_SUCCESS:
        draft.weatherCallLoading = false;
        draft.weatherCallDone = true;
        draft.weatherInfo = action.data;
        break;
      case CALL_WEATHER_FAILURE:
        draft.weatherCallLoading = false;
        draft.weatherCallError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
