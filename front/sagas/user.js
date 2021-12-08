import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* login(action) {
  try {
    console.log('saga login 실행');
    yield delay(1000);
    // const result = yield call(loginAPI, action.data);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest('LOG_IN_REQUEST', login);
}
function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogOut)]);
}
