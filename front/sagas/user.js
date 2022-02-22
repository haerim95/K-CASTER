import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import {
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE
} from '../reducers/user';
import axios from 'axios';

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* login(action) {
  try {
    yield delay(1000);
    // const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data
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
      type: LOG_OUT_SUCCESS
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data
    });
  }
}

function signUpAPI() {
  return axios.post('https://localhost:3065/user');
}

function* signUp() {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data
    });
  }
}

function followAPI() {
  return axios.post('/api/follow');
}

function* follow(action) {
  try {
    // const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data
    });
  }
}

function unfollowAPI() {
  return axios.post('/api/unfollow');
}

function* unfollow(action) {
  try {
    // const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnfollow)
  ]);
}
