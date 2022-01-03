import axios from 'axios';
import { all, call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  CALL_WEATHER_FAILURE,
  CALL_WEATHER_REQUEST,
  CALL_WEATHER_SUCCESS
} from '../reducers/weather';

function weatherAPI() {
  return axios.get('/api/weather');
}

function* weather(action) {
  try {
    // const result = yield call(weatherAPI);
    yield delay(1000);
    yield put({
      type: CALL_WEATHER_SUCCESS
      // data: action.data
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
}

export default function* weatherSaga() {
  yield all([fork(watchWeather)]);
}
