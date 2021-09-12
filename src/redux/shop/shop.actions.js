
import ShopActionTypes from "./shop.types";

// this action was created because the shop data were stored in the backend (firestore)
export const updateCollections = (collectionsMap) => ({
    type: ShopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
});