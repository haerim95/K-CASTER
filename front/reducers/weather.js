import produce from 'immer';

export const initialState = {
  weatherLoading: false,
  weatherIcon: null,
  weatherCallError: null
};

export const CALL_WEATHER_REQUEST = 'CALL_WEATHER_REQUEST';
export const CALL_WEATHER_SUCCESS = 'CALL_WEATHER_SUCCESS';
export const CALL_WEATHER_FAILURE = 'CALL_WEATHER_FAILURE';

const dummyWeather = {
  city: '서울시',
  weatherCode: 1,
  weatherState: '비',
  whatherIcon: 'rain'
};

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case CALL_WEATHER_REQUEST:
        draft.weatherLoading = true;
        weatherIcon = null;
        break;
      case CALL_WEATHER_SUCCESS:
        draft.weatherLoading = false;
        weatherIcon = null;
        break;
      case CALL_WEATHER_FAILURE:
        draft.weatherLoading = false;
        draft.weatherCallError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
