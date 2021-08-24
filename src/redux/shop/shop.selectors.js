
import { createSelector } from "reselect";

/* A curried function is not memoized using createSelector because it has a first param that is always changing and thus forcing re-renders or so... */
import memoize from 'lodash.memoize';

// we are using this object because the url parameter is a string, whereas the id we want to match is a number
// not needed anymore because shop data is now an object, and everything inside of it is in string format
/*const COLLECTION_ID_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
}*/

// input selector
const selectShop = (state) => state.shop;

// output selectors
export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

// here we return createSelector (called a curried function: a function that returns another function)
// Memoize does the same idea of memoization as reselect does for our selectors, except this time we're memoizing the return of our function which returns our selector:
// the collectionUrlParam is usually http://localhost:3000/shop all the time, thus, the 2nd parameter is the one always changing (the 2nd param is represented by the collection returned by createSelector based on the id)
// A PROBLEM: if the array was so big, this will be a bottleneck and will affect the apps performance. So using .find() method is not optimal. INSTEAD OF STORING OUR COLLECTIONS INSIDE AN ARRAY, WE CAN STORE IT INSIDE AND "OBJECT" SO THAT WE HAVE DIRECT ACCESS TO WHAT we want without iterating (using .find()) as was done in "COLLECTION_ID_MAP[collectionUrlParam]"
export const selectCollection = memoize((collectionUrlParam) => createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    )
);

/*
// currying with memoization and using .find()
export const selectCollection = memoize((collectionUrlParam) => createSelector(
        [selectCollections],
        collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
    )
);
*/

/*
// currying without memoization
export const selectCollection = (collectionUrlParam) => createSelector(
    [selectCollections],
    collections => collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
);
*/

// this selector converts the object of SHOP_DATA into an array
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    /* 
        - Object.keys: it gets us all the keys of an object that we pass into it and gives it to us in an array format 
        - we are getting the keys first, then getting the values using .map()
    */
    collections => Object.keys(collections).map(key => collections[key])
);
