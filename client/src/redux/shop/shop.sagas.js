
import { takeLatest, call, put, all } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

/*
    - saga 'effects' allow us to do different things with the store (like creating actions) or listening for actions
    - takeEvery(): it listens to every action of a specific type that we pass to it
    - put: it is the saga effect for creating actions (instead of dispatch in thunk)
*/

export function* fetchCollectionsAsync() {
    // yield console.log('I am fired');

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        // const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }

}

export function* fetchCollectionsStart() {
    /*yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );*/
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield(all([
        call(fetchCollectionsStart)
    ]));
}