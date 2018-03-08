import { delay } from 'redux-saga'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

export const delayy = ms => new Promise(resolve => setTimeout(resolve, ms))

import fetchJsonp from 'fetch-jsonp';

const fetchDataFromServer = (url) => {
	return fetchJsonp(url)
}

export function* helloSaga() {
	fetchJsonp('http://comment.house.ifeng.com/api/comment/list?houseId=108358&type=0&pic=0').then(function (data){
		return data.json()
	}).then(function (json) {
		console.log(json);
	})	
  	console.log('Hello Saga!')
}

export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({type: 'INCREMENT'})
}

export function* decrementAsync() {
  // yield call(delay, 1000)
  // yield put({type: 'DECREMENT'})
  	const result = yield fetchDataFromServer('http://comment.house.ifeng.com/api/comment/list?houseId=108358&type=0&pic=0').then(function(data){
  		return data.json()
  	});
  	console.log(result);
  	// const data = yield result.then(function (data) {
  	// 	return data
  	// })
  	// console.log(data);
}

export function* watchIncrementAsync() {
  yield takeLatest('INCREMENT_ASYNC', incrementAsync)
  yield takeLatest('DECREMENT_ASYNC', decrementAsync)
}


// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    helloSaga(),
    watchIncrementAsync()
   
  ]
}
