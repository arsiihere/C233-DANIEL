import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../features/auth/authSlice";

function* handleLogin(action) {
  try {
    const response = yield call(
      fetch,
      "https://seattlelisted.com/user/authenticate.php?mobile=yes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      }
    );
    const result = yield response.json();

    if (result.success) {
      yield put(loginSuccess());
    } else {
      yield put(loginFailure(result.error));
    }
  } catch (error) {
    yield put(loginFailure("Network Error"));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
