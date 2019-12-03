import { call, put, takeEvery } from 'redux-saga/effects';

function* authentication(action) {
  yield put({ type: 'AUTHENTICATION', data: action.payload });
}

export default function* rootSaga() {
  yield takeEvery('AUTHENTICATION', authentication);
}
