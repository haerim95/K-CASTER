import axios from 'axios';
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import {
  CALL_WEATHER_FAILURE,
  CALL_WEATHER_REQUEST,
  CALL_WEATHER_SUCCESS
} from '../reducers/weather';

function weatherAPI(location) {
  const city = location;
  const weatherKey = 'c43ed2d696718707f3f45cef18397c78';
  if (city === '') {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${weatherKey}&lang=kr&units=metric`
    );
  } else {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&lang=kr&units=metric`
    );
  }
}

function* weather(action) {
  try {
    const result = yield call(weatherAPI, action.location);
    yield put({
      type: CALL_WEATHER_SUCCESS,
      data: result.data
    });
  } catch (err) {
    yield put({
      type: CALL_WEATHER_FAILURE,
      error: err.response.data
    });
  }
}

function* watchWeather() {
  yield takeLatest(CALL_WEATHER_REQUEST, weather);
  // yield takeEvery(CALL_WEATHER_REQUEST, weather);
}

export default function* weatherSaga() {
  yield all([fork(watchWeather)]);
}
