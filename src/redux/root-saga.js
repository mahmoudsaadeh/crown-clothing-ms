
import { all, call } from 'redux-saga/effects';

// import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.saga';
import { cartSagas } from './cart/cart.sagas';
import { shopSagas } from './shop/shop.sagas';


/*
    - all: it launches all the sagas at once, each in a separate task
    - yield fetchCollectionsStart() (3 times)
    - the this way, each saga should wait for the previous one to finish so that it gets launched!

*/
export default function* rootSaga() {
    yield all([
        //call(fetchCollectionsStart),
        call(userSagas),
        call(cartSagas),
        call(shopSagas)
    ]);
}